import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/col-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { TCh2 } from '@/components/Typography';
import { Plus } from 'lucide-react';
import { main_server } from '@/helpers/http-client';
import { Link, useNavigate } from 'react-router';

export default function Collections() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await main_server.post(
        '/my-scenes',
        {
          title
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        }
      );
      console.log(response.data.canvas);
      navigate(`/collections/canvas/${response.data.canvas.id}`);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getCollections = async () => {
      const { data } = await main_server.get('/my-scenes', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      setCollections(data.collections);
    };

    getCollections();
  }, []);

  return (
    <main className="min-h-screen bg-white px-4 mt-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8 gap-5">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2" onClick={() => setOpen(true)}>
                <Plus size={18} /> Create
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a canvas</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate} className="flex flex-col gap-4 mt-2">
                <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <DialogFooter>
                  <Button type="submit" className="w-full">
                    Create
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <TCh2 className="text-black">Your Collections</TCh2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((col) => (
            <Link to={`/collections/canvas/${col.id}`} key={col.id}>
              <Card className="bg-white border border-gray-200">
                <div className="w-full h-32 bg-gray-100 rounded-t-md flex items-center justify-center">
                  <span className="text-gray-300 text-4xl">{col.title[0].toUpperCase()}</span>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-black">{col.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-gray-500">Last edited: {new Date().toDateString(col.updatedAt)}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
