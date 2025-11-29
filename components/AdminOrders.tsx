"use client";

import React, { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Package, CheckCircle, Clock } from "lucide-react";

export default function AdminOrdersComponent({ orders }: { orders?: any[] }) {
  const demoOrders = [
    { id: "ORD-1001", date: "2025-11-25", status: "completed", total: 120.5 },
    { id: "ORD-1002", date: "2025-11-25", status: "pending", total: 45.0 },
    { id: "ORD-1003", date: "2025-11-24", status: "completed", total: 220.0 },
    { id: "ORD-1004", date: "2025-11-23", status: "processing", total: 89.99 },
    { id: "ORD-1005", date: "2025-11-22", status: "completed", total: 15.0 },
    { id: "ORD-1006", date: "2025-11-20", status: "cancelled", total: 0 },
  ];

  const data = orders && orders.length ? orders : demoOrders;

  const metrics = useMemo(() => {
    const totalOrders = data.length;
    const completed = data.filter((o) => o.status === "completed").length;
    const pending = data.filter((o) => o.status === "pending" || o.status === "processing").length;
    return { totalOrders, completed, pending };
  }, [data]);

  const chartData = useMemo(() => {
    const map: Record<string, { date: string; orders: number }> = {};
    data.forEach((o) => {
      const d = o.date;
      if (!map[d]) map[d] = { date: d, orders: 0 };
      map[d].orders += 1;
    });
    return Object.values(map).sort((a, b) => a.date.localeCompare(b.date));
  }, [data]);

  return (
    <section className="w-full p-4 md:p-6">
      {/* Header */}
      <header className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Orders Overview</h2>
          <p className="text-sm text-gray-600">Quick snapshot of recent orders.</p>
        </div>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded-2xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase text-gray-600">Total Orders</div>
              <div className="text-2xl font-bold text-gray-900">{metrics.totalOrders}</div>
            </div>
            <div className="p-3 bg-gray-100 text-gray-500 rounded-lg">
              <Package size={22} />
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase text-gray-600">Completed</div>
              <div className="text-2xl font-bold text-emerald-700">{metrics.completed}</div>
            </div>
            <div className="p-3 bg-emerald-100 rounded-lg text-gray-500">
              <CheckCircle size={22} />
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase text-gray-600">Pending / Processing</div>
              <div className="text-2xl font-bold text-amber-700">{metrics.pending}</div>
            </div>
            <div className="p-3 bg-amber-100 rounded-lg text-gray-500">
              <Clock size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Chart + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-4 bg-white rounded-2xl shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-gray-900">Orders (by date)</h3>
            <div className="text-sm text-gray-600">Showing last {chartData.length} days</div>
          </div>

          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#4B5563" }} />
                <YAxis allowDecimals={false} tick={{ fill: "#4B5563" }} />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#8884d8" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl shadow-sm border overflow-y-auto" style={{ maxHeight: 360 }}>
          <h3 className="text-lg font-medium mb-3 text-gray-900">Recent Orders</h3>
          <ul className="space-y-3">
            {data.slice(0, 8).map((o: any) => (
              <li key={o.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{o.id}</div>
                  <div className="text-xs text-gray-600">{o.date}</div>
                </div>
                <div className="text-sm">
                  <StatusBadge status={o.status} />
                </div>
              </li>
            ))}
            {data.length === 0 && <li className="text-sm text-gray-600">No orders found.</li>}
          </ul>
        </div>
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: string }) {
  const s = status?.toLowerCase();
  let bg = "bg-gray-100 text-gray-700";
  if (s === "completed") bg = "bg-emerald-200 text-emerald-800";
  if (s === "pending" || s === "processing") bg = "bg-amber-200 text-amber-800";
  if (s === "cancelled" || s === "refunded") bg = "bg-red-200 text-red-800";

  return <span className={`px-3 py-1 rounded-full text-xs font-medium ${bg}`}>{status}</span>;
}
