import { useRef } from "react";

export function useGetCanvasReg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawImageToCanvas = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
  return { drawImageToCanvas, canvasRef };
}
