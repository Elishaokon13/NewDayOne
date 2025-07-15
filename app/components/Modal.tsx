"use client";

import React, { useEffect, useRef, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import { X } from "lucide-react";
import PrintImage from "./PrintImage";

interface UserContext {
  fid: number;
}

export default function Modal({ setModal }: any) {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<UserContext | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [save, setSave] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!username || !selectedFile) {
      alert("Please provide a username and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("profilePicture", selectedFile);

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to save user");
      const data = await res.json();
      // Optionally handle success (e.g., close modal, show message, etc.)
      // alert("User saved!");
      console.log("Saved!!!");
      setSave(true);
    } catch (err) {
      alert("Error saving user");
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
          <span className="font-medium text-black/70">Farcaster username</span>
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
            <div className="w-fit relative">
              <img
                src={image}
                alt="Preview"
                className="w-40 h-40 rounded-xl object-cover border border-gray-200 shadow"
              />
              <button
                className="absolute bottom-2 left-1/2 -translate-x-1/2 px-6 py-2 bg-[#0000ff]/80 font-light text-white rounded-lg font-medium hover:bg-blue-700 transition backdrop-blur-sm"
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
              <span className="text-gray-500 text-xs">
                Click to upload image
              </span>
            </div>
          )}
        </div>
        <button
          className="px-7 py-3 bg-[#0000FF] font-light text-white w-full hover:bg-blue-700 rounded-xl"
          onClick={handleSubmit}
        >
          Save a day!
        </button>
      </div>
      {save && <PrintImage image={image} username={username} />}
    </div>
  );
}
