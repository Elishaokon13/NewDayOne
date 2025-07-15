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

  const handleTwitterShare = async () => {
    if (imageExportRef.current === null) {
      return;
    }

    try {
      // Generate image
      const dataUrl = await toPng(imageExportRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
        cacheBust: true,
      });

      // Convert data URL to blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      // Create a File object from the blob
      const file = new File([blob], `base-day-one-${username || "user"}.png`, {
        type: "image/png",
      });

      // Check if Web Share API is supported and can share files
      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: "Base Day One",
          text: `I'm attending A NEW DAY ONE - Base's Next Chapter! 🚀\n\nJuly 16th • Los Angeles\n\n#BaseChain #DayOne #Crypto`,
        });
      } else {
        // Fallback: Open Twitter in a new tab with text and hashtags
        const text = encodeURIComponent(
          `I'm attending A NEW DAY ONE - Base's Next Chapter! 🚀\n\nJuly 16th • Los Angeles`
        );
        const hashtags = encodeURIComponent("BaseChain,DayOne,Crypto");
        const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&hashtags=${hashtags}`;
        window.open(twitterUrl, "_blank");
      }
    } catch (error) {
      console.error("Error sharing to Twitter:", error);
      // Fallback: Open Twitter with text only
      const text = encodeURIComponent(
        `I'm attending A NEW DAY ONE - Base's Next Chapter! 🚀\n\nJuly 16th • Los Angeles`
      );
      const hashtags = encodeURIComponent("BaseChain,DayOne,Crypto");
      const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&hashtags=${hashtags}`;
      window.open(twitterUrl, "_blank");
    }
  };

  const handleFarcasterShare = async () => {
    if (imageExportRef.current === null) {
      return;
    }

    try {
      // Generate image
      const dataUrl = await toPng(imageExportRef.current, {
        quality: 1.0,
        pixelRatio: 2, // For higher quality/retina displays
        backgroundColor: "#ffffff",
        cacheBust: true,
      });

      // Convert data URL to blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      // Create a File object from the blob
      const file = new File([blob], `base-day-one-${username || "user"}.png`, {
        type: "image/png",
      });

      // Check if Web Share API is supported and can share files
      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: "Base Day One",
          text: `I'm attending A NEW DAY ONE - Base's Next Chapter! 🚀`,
        });
      } else {
        // Fallback: Open Farcaster in a new tab with text
        const text = encodeURIComponent(
          `I'm attending A NEW DAY ONE - Base's Next Chapter! 🚀\n\nJuly 16th • Los Angeles`
        );
        const farcasterUrl = `https://warpcast.com/~/compose?text=${text}`;
        window.open(farcasterUrl, "_blank");
      }
    } catch (error) {
      console.error("Error sharing to Farcaster:", error);
      // Fallback: Open Farcaster with text only
      const text = encodeURIComponent(
        `I'm attending A NEW DAY ONE - Base's Next Chapter! 🚀\n\nJuly 16th • Los Angeles`
      );
      const farcasterUrl = `https://warpcast.com/~/compose?text=${text}`;
      window.open(farcasterUrl, "_blank");
    }
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm text-black">
        <div className="flex flex-col overflow-y-auto items-center gap-3 p-3 relative">
          <ImageExport image={image} username={username} />
          <div className="absolute opacity-[0%] -z-[10000]">
            <div ref={imageExportRef}>
              <ImageExportDup image={image} username={username} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="px-7 py-4 bg-[#0000FF] font-light !text-sm text-white w-full hover:bg-blue-700 rounded-xl"
            >
              Download
            </button>
            {/* <button
              className=" px-3 py-3 bg-[#7c65c1] flex items-center hover:bg-[#7c65c1]/80 rounded-xl"
              onClick={handleFarcasterShare}
            >
              <img src="/farcaster.svg" alt="" className="w-12" />
            </button>
            <button className="px-3 py-3 bg-black flex items-center hover:bg-black/80 rounded-xl" onClick={handleTwitterShare}>
              <img
                src="/twitter.svg"
                alt=""
                className="w-12 !p-0 !text-white"
              />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
