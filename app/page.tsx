"use client";
import { useDraw } from "@/hooks/useDraw";
import { FC, useRef, useState } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const { canvasRef, onMouseDown } = useDraw(drawLine);

  function drawLine({ ctx, currentPoint, prevPoint }: Draw) {
    const { x: currX, y: currY } = currentPoint;

    const lineColor = "#0000";
    const linewidth = 5;

    let startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = linewidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
  }

  return (
    <>
      <div className="w-screen h-screen bg-white flex justify-center items-center">
        <canvas
          onMouseDown={onMouseDown}
          width={750}
          height={750}
          className="border border-black rounded-md"
          ref={canvasRef}
        />
      </div>
    </>
  );
};

export default page;
