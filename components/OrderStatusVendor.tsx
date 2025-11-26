"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Package, Truck, ShoppingBag, Clock } from "lucide-react";
import { OrderCard } from "./OrderCard";

export default function OrdersDashboard() {
  const orders = [
    { id: 1, product: "Wireless Headphones", status: "Pending", amount: 120 },
    { id: 2, product: "Smart Watch", status: "Preparing", amount: 90 },
    { id: 3, product: "Laptop Bag", status: "Shipped", amount: 55 },
    { id: 4, product: "Gaming Mouse", status: "Delivered", amount: 35 },
  ];

  const statusCount = [
    { name: "Pending", value: 4 },
    { name: "Preparing", value: 7 },
    { name: "Shipped", value: 5 },
    { name: "Delivered", value: 12 },
  ];

  const COLORS = ["#FACC15", "#60A5FA", "#34D399", "#A78BFA"];

  return (
    <div className="p-6 space-y-6 text-gray-900">

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <OrderCard title="Pending" value="4" icon={<Clock className="text-yellow-500" />} />
        <OrderCard title="Preparing" value="7" icon={<ShoppingBag className="text-blue-500" />} />
        <OrderCard title="Shipped" value="5" icon={<Truck className="text-green-500" />} />
        <OrderCard title="Delivered" value="12" icon={<Package className="text-purple-600" />} />
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* BAR CHART */}
        <div className="p-4 bg-white  rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Orders Status Chart
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusCount}>
              <XAxis dataKey="name" stroke="#4B5563" />
              <YAxis stroke="#4B5563" />
              <Tooltip />
              <Bar dataKey="value">
                {statusCount.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="p-4 bg-white  rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">
            Orders Distribution
          </h3>

          <ResponsiveContainer width={280} height={280}>
            <PieChart>
              <Pie
                data={statusCount}
                dataKey="value"
                outerRadius={110}
                label
              >
                {statusCount.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* RECENT ORDERS TABLE */}
      <div className="p-4 bg-white  rounded-xl shadow hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">
          Recent Orders
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 text-gray-800 font-semibold">Order ID</th>
                <th className="text-gray-800 font-semibold">Product</th>
                <th className="text-gray-800 font-semibold">Status</th>
                <th className="text-gray-800 font-semibold">Amount</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50 transition">
                  <td className="py-2 text-gray-700">{o.id}</td>
                  <td className="text-gray-700">{o.product}</td>
                  <td className="font-semibold text-gray-800">{o.status}</td>
                  <td className="text-gray-900">${o.amount}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}
