"use client";

import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { Users, UserCog, Boxes } from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Admin Home");

  // Dashboard Stats
  const stats = [
    { title: "Total Users", value: 1200, icon: Users, color: "bg-blue-500" },
    { title: "Total Vendors", value: 85, icon: UserCog, color: "bg-green-500" },
    { title: "Total Products", value: 540, icon: Boxes, color: "bg-purple-500" },
  ];

  // Graph Data
  const data = [
    { name: "Jan", users: 400, products: 300 },
    { name: "Feb", users: 450, products: 320 },
    { name: "Mar", users: 500, products: 340 },
    { name: "Apr", users: 600, products: 380 },
    { name: "May", users: 750, products: 420 },
    { name: "Jun", users: 900, products: 500 },
  ];

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar Component */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 overflow-auto mt-11 md:mt-0">

        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Admin Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="p-5 bg-white rounded-xl shadow-md border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-full text-white ${item.color}`}>
                    <Icon size={28} />
                  </div>

                  <div>
                    <h3 className="text-gray-500 text-sm">{item.title}</h3>
                    <p className="text-3xl font-bold text-gray-800">{item.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Graph Section */}
        <div className="mt-10 bg-white p-6 shadow-md rounded-xl border">

          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Users & Products Growth
          </h2>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Bar dataKey="users" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="products" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
      </main>
    </div>
  );
}
