"use client";
import { useDraw } from "@/hooks/useDraw";
import { FC, useRef, useState } from "react";
import { ChromePicker } from "react-color";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [color, setColor] = useState<string>("#000");
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {}

  return (
    <>
      <div className="w-screen h-screen bg-white flex justify-center items-center">
        <div className="flex flex-col gap-10 pr-10">
          <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
          <button className="p-2 border border-black rounded-md">
            Clear Art
          </button>
        </div>
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
