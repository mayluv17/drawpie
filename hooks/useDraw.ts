import { useRef, useEffect, useState } from "react";

export const useDraw = (
  onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void
) => {
  const [mouseDown, setMousDown] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPoint = useRef<null | Point>(null);

  const onMouseDown = () => setMousDown(true);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const currentPoint = computeCanvasPoint(e);
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx || !currentPoint) return;

      onDraw({ ctx, currentPoint, prevPoint: prevPoint.current });
      prevPoint.current = currentPoint;
    };

    const computeCanvasPoint = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.right;
      return { x, y };
    };

    canvasRef.current?.addEventListener("mousemove", handler);
    return () => canvasRef.current?.addEventListener("mousemove", handler);
  }, []);
  return { canvasRef, onMouseDown };
};
