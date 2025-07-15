"use client";

import React, { useEffect, useRef, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import { X } from "lucide-react";

interface UserContext {
  fid: number;
}

export default function Modal({ setModal }: any) {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<UserContext | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { user } = await sdk.context;
      setUser(user);
    };

    fetchUser();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm text-black">
      <div className="bg-white rounded-xl shadow-lg max-w-[420px] w-full p-8 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-5">
          <h2 className="text-2xl font-semibold">Save a sit!</h2>
          <div className="cursor-pointer" onClick={() => setModal(false)}>
            <X size={25} />
          </div>
        </div>
        <label className="flex flex-col gap-2">
          <span className="font-medium text-black/70">Username</span>
          <input
            type="text"
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <div className="flex flex-col gap-2">
          <span className="font-medium text-black/70">Profile Image</span>
          {image ? (
            <div className="w-fit space-y-2">
              <img
                src={image}
                alt="Preview"
                className="w-40 h-40 rounded-xl object-cover border border-gray-200 shadow"
              />
              <button
                className="px-6 py-2 w-full bg-[#0000ff] font-light text-white rounded-lg font-medium hover:bg-blue-700 transition"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload
              </button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </div>
          ) : (
            <div
              className="border-2 w-40 h-40 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              <span className="text-gray-500">Click to upload image</span>
            </div>
          )}
        </div>
        <button className="px-7 py-3 bg-[#0000FF] font-light text-white w-full hover:bg-blue-700 rounded-xl">
          Save a day!
        </button>
      </div>
    </div>
  );
}
