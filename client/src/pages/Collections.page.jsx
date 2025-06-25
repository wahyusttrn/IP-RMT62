import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/col-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { TCh2 } from '@/components/Typography';
import { Plus } from 'lucide-react';

const collections = [
  { title: 'Project Alpha', lastEdited: '2025-06-20 14:32' },
  { title: 'Design Sprint', lastEdited: '2025-06-18 09:10' },
  { title: 'Research Notes', lastEdited: '2025-06-10 17:45' }
];

export default function Collections() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');

  // Placeholder for create logic
  const handleCreate = (e) => {
    e.preventDefault();
    // TODO: handle create collection
    setOpen(false);
    setTitle('');
  };

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
            <Card key={col.title} className="bg-white border border-gray-200">
              <div className="w-full h-32 bg-gray-100 rounded-t-md flex items-center justify-center">
                <span className="text-gray-300 text-4xl">📄</span>
              </div>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-black">{col.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-gray-500">Last edited: {col.lastEdited}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
