import React, { useRef, useEffect, useState } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
import '../excalidraw.style.css';
import { TCh2 } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { main_server } from '@/helpers/http-client';

export default function Canvas() {
  const { id } = useParams();
  const excalidrawRef = useRef(null);
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  const [initialValue, setInitialValue] = useState([]);

  useEffect(() => {
    const fetchCanvas = async () => {
      const { data } = await main_server.get(`/my-scenes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      const gatau = JSON.parse(JSON.parse(data.canvas.scene));
      setInitialValue(gatau.elements);

      if (excalidrawAPI && data?.canvas?.scene) {
        excalidrawAPI.updateScene(data.canvas.scene);
      }
    };

    fetchCanvas();
  }, [excalidrawAPI, id]);

  console.log(initialValue);

  const handleSave = async () => {
    if (!excalidrawAPI) return;

    const scene = {
      elements: excalidrawAPI.getSceneElements(),
      appState: excalidrawAPI.getAppState()
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

      <h1>### {initialValue.join()}</h1>

      <div className="flex-1">
        <Excalidraw
          initialData={{
            elements: [
              {
                id: '5VXvr10Lq6t5--1pCae7A',
                type: 'rectangle',
                x: 254.60546875,
                y: 222.85546875,
                width: 179.30078125,
                height: 99.92578125,
                angle: 0,
                strokeColor: '#1e1e1e',
                backgroundColor: 'transparent',
                fillStyle: 'solid',
                strokeWidth: 2,
                strokeStyle: 'solid',
                roughness: 1,
                opacity: 100,
                groupIds: [],
                frameId: null,
                index: 'a0',
                roundness: { type: 3 },
                seed: 697355924,
                version: 385,
                versionNonce: 1916407700,
                isDeleted: false,
                boundElements: [
                  { id: 'WbzRs4oi3OqqjKDaktQfQ', type: 'text' },
                  { id: 'ZJi45Z-ZU6Jvyi26bbp4I', type: 'arrow' }
                ],
                updated: 1750858051741,
                link: null,
                locked: false
              },
              {
                id: 'WbzRs4oi3OqqjKDaktQfQ',
                type: 'text',
                x: 322.65586853027344,
                y: 260.318359375,
                width: 43.199981689453125,
                height: 25,
                angle: 0,
                strokeColor: '#1e1e1e',
                backgroundColor: 'transparent',
                fillStyle: 'solid',
                strokeWidth: 2,
                strokeStyle: 'solid',
                roughness: 1,
                opacity: 100,
                groupIds: [],
                frameId: null,
                index: 'a1',
                roundness: null,
                seed: 1696717844,
                version: 10,
                versionNonce: 305382444,
                isDeleted: false,
                boundElements: null,
                updated: 1750858032543,
                link: null,
                locked: false,
                text: 'Hello',
                fontSize: 20,
                fontFamily: 5,
                textAlign: 'center',
                verticalAlign: 'middle',
                containerId: '5VXvr10Lq6t5--1pCae7A',
                originalText: 'Hello',
                autoResize: true,
                lineHeight: 1.25
              },
              {
                id: 'wJT0m6LzmVyd8DW84GTLv',
                type: 'rectangle',
                x: 576.7890625,
                y: 222.0625,
                width: 179.30078125,
                height: 99.92578125,
                angle: 0,
                strokeColor: '#1e1e1e',
                backgroundColor: 'transparent',
                fillStyle: 'solid',
                strokeWidth: 2,
                strokeStyle: 'solid',
                roughness: 1,
                opacity: 100,
                groupIds: [],
                frameId: null,
                index: 'a2',
                roundness: { type: 3 },
                seed: 299134100,
                version: 554,
                versionNonce: 71449236,
                isDeleted: false,
                boundElements: [
                  { type: 'text', id: 'MQle88Q5nM5Xx64aJA34U' },
                  { id: 'ZJi45Z-ZU6Jvyi26bbp4I', type: 'arrow' }
                ],
                updated: 1750858051741,
                link: null,
                locked: false
              },
              {
                id: 'MQle88Q5nM5Xx64aJA34U',
                type: 'text',
                x: 628.6894760131836,
                y: 259.525390625,
                width: 75.49995422363281,
                height: 25,
                angle: 0,
                strokeColor: '#1e1e1e',
                backgroundColor: 'transparent',
                fillStyle: 'solid',
                strokeWidth: 2,
                strokeStyle: 'solid',
                roughness: 1,
                opacity: 100,
                groupIds: [],
                frameId: null,
                index: 'a3',
                roundness: null,
                seed: 1023908908,
                version: 187,
                versionNonce: 1562801940,
                isDeleted: false,
                boundElements: null,
                updated: 1750858042223,
                link: null,
                locked: false,
                text: 'Bonjour',
                fontSize: 20,
                fontFamily: 5,
                textAlign: 'center',
                verticalAlign: 'middle',
                containerId: 'wJT0m6LzmVyd8DW84GTLv',
                originalText: 'Bonjour',
                autoResize: true,
                lineHeight: 1.25
              },
              {
                id: 'ZJi45Z-ZU6Jvyi26bbp4I',
                type: 'arrow',
                x: 434.94140625,
                y: 272.4453125,
                width: 142.890625,
                height: 1.125,
                angle: 0,
                strokeColor: '#1e1e1e',
                backgroundColor: 'transparent',
                fillStyle: 'solid',
                strokeWidth: 2,
                strokeStyle: 'solid',
                roughness: 1,
                opacity: 100,
                groupIds: [],
                frameId: null,
                index: 'a4',
                roundness: { type: 2 },
                seed: 1708835348,
                version: 65,
                versionNonce: 687537428,
                isDeleted: false,
                boundElements: null,
                updated: 1750858051741,
                link: null,
                locked: false,
                points: [
                  [0, 0],
                  [142.890625, -1.125]
                ],
                lastCommittedPoint: null,
                startBinding: { elementId: '5VXvr10Lq6t5--1pCae7A', focus: 0.006728696790811634, gap: 1.03515625 },
                endBinding: { elementId: 'wJT0m6LzmVyd8DW84GTLv', focus: 0.027683707257985527, gap: 1.04296875 },
                startArrowhead: null,
                endArrowhead: 'arrow',
                elbowed: false
              }
            ],
            appState: { zenModeEnabled: false, viewBackgroundColor: '#ffffff' },
            scrollToContent: true
          }}
          ref={excalidrawRef}
          onAPIChange={setExcalidrawAPI}
        />
      </div>
    </div>
  );
}
