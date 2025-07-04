import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/col-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { TCh2 } from '@/components/Typography';
import { Plus } from 'lucide-react';
import { main_server } from '@/helpers/http-client';
import { Link, useNavigate } from 'react-router';
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from '@/components/ui/context-menu';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollection } from '@/store/collection';

export default function Collections() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { collection } = useSelector((state) => state.collection);

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

  const handleDelete = async (id) => {
    try {
      const response = await main_server.delete(`/my-scenes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      console.log(response);
      dispatch(fetchCollection());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchCollection());
  }, [dispatch]);

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
          {collection.map((col) => (
            <ContextMenu key={col.id}>
              <ContextMenuTrigger asChild>
                <Link to={`/collections/canvas/${col.id}`}>
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
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem
                  onSelect={() => {
                    handleDelete(col.id);
                  }}
                  className="text-red-600 focus:bg-red-50"
                >
                  Delete
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </div>
      </div>
    </main>
  );
}
