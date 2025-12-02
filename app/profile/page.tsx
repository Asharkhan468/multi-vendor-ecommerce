"use client";

import React, { useState } from "react";
import { Camera, Pencil } from "lucide-react";

export default function ProfilePage() {
  const [name, setName] = useState("Ashar Khan");
  const [email, setEmail] = useState("ashar@example.com");

  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center px-4 py-10">

      {/* Solid White Card */}
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md text-center">

        {/* Profile Image */}
        <div className="relative w-36 h-36 mx-auto">
          <img
            src="/profile.png"
            className="w-36 h-36 rounded-full object-cover border-4 border-gray-200 shadow-lg"
            alt="Profile"
          />

          {/* Edit Image Button */}
          <button className="absolute bottom-1 right-1 bg-indigo-600 text-white w-10 h-10 flex items-center justify-center rounded-full shadow hover:scale-105 transition">
            <Camera size={20} />
          </button>
        </div>

        {/* Name */}
        <div className="mt-6">
          {editName ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-100 text-gray-900 text-center py-2 px-3 rounded-xl outline-none border border-gray-300 w-full"
            />
          ) : (
            <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
          )}

          <button
            onClick={() => setEditName(!editName)}
            className="mt-2 text-indigo-600 hover:text-indigo-800 transition"
          >
            <Pencil size={18} />
          </button>
        </div>

        {/* Email */}
        <div className="mt-4">
          {editEmail ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-100 text-gray-900 text-center py-2 px-3 rounded-xl outline-none border border-gray-300 w-full"
            />
          ) : (
            <p className="text-gray-600">{email}</p>
          )}

          {/* <button
            onClick={() => setEditEmail(!editEmail)}
            className="mt-2 text-indigo-600 hover:text-indigo-800 transition"
          >
            <Pencil size={18} />
          </button> */}
        </div>

        {/* Save Button */}
        <button className="w-full mt-8 bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition shadow-md">
          Save Changes
        </button>
      </div>
    </div>
  );
}
