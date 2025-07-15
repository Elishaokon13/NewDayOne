"use client";

import React, { useRef } from "react";
import ImageExport from "./ImageExport";
import { toPng } from "html-to-image";
import ImageExportDup from "./ImageExportDup";

export default function PrintImage({ image, username }: any) {
  const imageExportRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (imageExportRef.current === null) {
      return;
    }

    try {
      // Create the image
      const dataUrl = await toPng(imageExportRef.current, {
        quality: 1.0,
        pixelRatio: 2, // For higher quality/retina displays
        backgroundColor: "#ffffff",
        cacheBust: true,
      });

      // Create download link
      const link = document.createElement("a");
      link.download = `base-day-one-${username || "user"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
      // Optionally show user-friendly error message
    }
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm text-black">
        <div className="flex flex-col items-center gap-3 p-3">
            <ImageExport image={image} username={username} />
          <div ref={imageExportRef} className="hidden">
            <ImageExportDup image={image} username={username} />

          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="px-7 py-4 bg-[#0000FF] font-light !text-sm text-white w-full hover:bg-blue-700 rounded-xl"
            >
              Download
            </button>
            <button className=" px-3 py-3 bg-[#7c65c1] flex items-center hover:bg-[#7c65c1]/80 rounded-xl">
              <img src="/farcaster.svg" alt="" className="w-12" />
            </button>
            <button className="px-3 py-3 bg-black flex items-center hover:bg-black/80 rounded-xl">
              <img
                src="/twitter.svg"
                alt=""
                className="w-12 !p-0 !text-white"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
