import React, { useRef, useEffect, useState } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
import '../excalidraw.style.css';
import { TCh2 } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

export default function Canvas() {
  const excalidrawRef = useRef(null);
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  useEffect(() => {
    const fetchCanvas = async () => {
      const response = await fetch('/api/canvas/123');
      const result = await response.json();

      if (excalidrawAPI && result?.data) {
        excalidrawAPI.updateScene(result.data);
      }
    };

    fetchCanvas();
  }, [excalidrawAPI]);

  const handleSave = async () => {
    if (!excalidrawAPI) return;

    const scene = {
      elements: excalidrawAPI.getSceneElements(),
      appState: excalidrawAPI.getAppState(),
      files: excalidrawAPI.getFiles()
    };

    // await fetch('/api/canvas/123', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ data: scene })
    // });
    console.log(JSON.stringify(scene));
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex items-center gap-5 px-16 h-16">
        <Link to={'/collections'}>
          <Button variant="ghost" size="icon" className={'mb-2'}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <TCh2 className="text-lg">Canvas Title</TCh2>

        <Button onClick={handleSave} className="text-white px-4 py-1 rounded ml-auto">
          Save
        </Button>
      </div>

      <div className="flex-1">
        <Excalidraw ref={excalidrawRef} excalidrawAPI={(api) => setExcalidrawAPI(api)} />
      </div>
    </div>
  );
}
