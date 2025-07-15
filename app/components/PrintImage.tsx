"use client";

import React from "react";
import ImageExport from "./ImageExport";

export default function PrintImage({ image, username }: any) {
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm text-black">
        <div className="flex flex-col items-center gap-3">
          <ImageExport image={image} username={username} />
          <div className="flex items-center gap-3">
            <button className="px-7 py-4 bg-[#0000FF] font-light !text-sm text-white w-full hover:bg-blue-700 rounded-xl">
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
