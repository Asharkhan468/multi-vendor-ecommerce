"use client";

import React, { useState } from "react";
import { Camera, Pencil, Check, User, Mail } from "lucide-react";

export default function ProfilePage() {
  const [name, setName] = useState("Ashar Khan");
  const [email] = useState("ashar@example.com"); // read-only
  const [role] = useState("Admin"); // read-only

  const [editName, setEditName] = useState(false);
  const [editPhoto, setEditPhoto] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 via-purple-50 to-pink-50 text-gray-900">
      {/* Header */}
      <header className="bg-indigo-600 text-white py-6 px-6 shadow-lg">
        <h1 className="text-3xl font-bold tracking-wide">Profile</h1>
      </header>

      {/* Profile Card Section */}
      <section className="container mx-auto py-16 px-4">
        <div
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 
                        bg-white/70 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/30
                        transition-transform "
        >
          {/* Left Side: Profile Image */}
          <div className="relative w-64 h-64 flex-shrink-0">
            <img
              src="/profile.png"
              className="w-64 h-64 rounded-full object-cover border-4 border-white shadow-xl transition-transform duration-300 hover:scale-105"
              alt="Profile"
            />
            <button
              onClick={() => setEditPhoto(!editPhoto)}
              className="absolute bottom-4 right-4 bg-gradient-to-tr from-indigo-500 to-purple-500 
                         text-white w-12 h-12 flex items-center justify-center rounded-full shadow-md 
                         hover:scale-110 transition-transform duration-300"
            >
              <Camera size={24} />
            </button>
          </div>

          {/* Right Side: Profile Details */}
          <div className="flex-1 flex flex-col gap-6 w-full">
            {/* Name */}
            <div className="flex items-center justify-between">
              {editName ? (
                <div className="flex items-center gap-2 w-full">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 bg-white/70 border border-indigo-300 rounded-xl px-4 py-2 outline-none shadow-inner focus:ring-2 focus:ring-indigo-400 text-lg font-medium transition"
                  />
                  <button
                    onClick={() => setEditName(false)}
                    className="text-green-500 hover:text-green-700 transition"
                  >
                    <Check size={24} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 w-full justify-between">
                  <div className="flex items-center gap-3">
                    <User size={28} className="text-indigo-600" />
                    <h2 className="text-3xl font-bold text-gray-800">{name}</h2>
                  </div>
                  <button
                    onClick={() => setEditName(true)}
                    className="text-indigo-600 hover:text-indigo-800 transition"
                  >
                    <Pencil size={22} />
                  </button>
                </div>
              )}
            </div>

            {/* Email (read-only) */}
            <div className="flex items-center gap-3 text-gray-700 text-lg font-medium">
              <Mail size={22} className="text-indigo-600" /> {email}
            </div>

            {/* Role (read-only) */}
            <div className="flex items-center gap-3 text-gray-700 text-lg font-medium">
              <User size={22} className="text-indigo-600" /> {role}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
