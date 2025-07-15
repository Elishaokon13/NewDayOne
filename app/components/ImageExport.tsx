import React from "react";
import DynamicSVG from "./DynamicSVG";

export default function ImageExport({ image, username }: any) {
  return (
    <div className="w-[660px] h-[600px] bg-white z-20 border p-5 text-black/80">
      <div className="flex flex-col w-full h-full items-center justify-between gap-6">
        <div className="flex items-center justify-between w-full gap-6 -mt-10">
          <p className="font-doto text-[56px]">.</p>
          <p className="font-doto text-[56px]">.</p>
        </div>
        <div className="w-full flex items-center justify-between gap-6">
          <div className="space-y-4">
            {/* <div className="relative">
              <img
                src="/curve.svg"
                alt=""
                className="w-[120px] absolute right-0 -top-4"
              />
              <p className="text-[36px] font-semibold">Hi, I'm Defidevrel</p>
              </div> */}
            <div className="space-y-2">
              <p className="text-[16px] text-[#0000ff] !italic font-light">
                I will be attending...
              </p>
              <h1 className="text-[56px] text-left max-w-[250px] leading-[56px] !font-doto font-bold">
                A NEW DAY ONE
              </h1>
              <p className="font-light text-3xl text-left">
                Base's Next Chapter
              </p>
              <div className="flex w-fit gap-2 items-center">
                <div className="w-[180px] bg-[#0000ff] h-2"></div>
                <div className="w-[40%] bg-[#f2accc] h-2"></div>
                <div className="w-[20%] bg-[#ffda59] h-2"></div>
              </div>
            </div>
          </div>
          <div className="w-fit h-fit max-w-[240px] p-3 border border-gray-200 rounded-lg relative">
            <div className="relative w-full">
              <div className="absolute top-0 left-0">
                <div className="w-11 h-11 rounded-xl bg-[#ffda54]"></div>
              </div>
              <DynamicSVG bgImage={image} width="full" height="full" />
            </div>
            <div className="w-full p-2 mt-2 rounded-xl bg-[#0000ff] text-center font-doto font-bold uppercase text-white text-[16px]">
              @{username}
            </div>
          </div>
        </div>
        <div className="h-[160px] w-full bg-[url('/Group.svg')] bg-fill bg-center bg-no-repeat flex items-center p-6 justify-center">
          <div className="w-full p-3 rounded-xl bg-[#0000ff] text-center font-doto uppercase text-white text-[38px]">
            July 16th . Los Angeles
          </div>
        </div>
      </div>
    </div>
  );
}
