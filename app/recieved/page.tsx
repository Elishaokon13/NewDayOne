import React from "react";

interface User {
  _id: string;
  username: string;
  imageUrl: string;
}

async function fetchUsers(): Promise<User[]> {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3001";
  const res = await fetch('/api/user', { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

console.log("user");

export default async function RecievedPage() {
  let users: User[] = [];
  try {
    users = await fetchUsers();
  } catch (e) {
    console.log(e);

    return <div className="p-8 text-black">Failed to load users.</div>;
  }

  return (
    <div className="p-8 text-black">
      <h1 className="text-2xl font-bold mb-4">Received Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="border rounded-lg p-4 flex flex-col items-center"
          >
            <img
              src={user.imageUrl}
              alt={user.username}
              className="w-24 h-24 rounded-xl object-cover mb-2"
            />
            <div className="font-semibold">{user.username}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
