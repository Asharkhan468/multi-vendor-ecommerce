"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function OrdersDashboard() {
  // Dummy Recent Orders
  const recentOrders = [
    { id: 1, product: "Wireless Headphones", amount: 120 },
    { id: 2, product: "Smart Watch", amount: 90 },
    { id: 3, product: "Laptop Bag", amount: 55 },
    { id: 4, product: "Gaming Mouse", amount: 35 },
  ];

  // Graph Data — Last Month vs Current Month
  const ordersGraph = [
    { name: "Last Month", orders: 35 },
    { name: "Current Month", orders: 58 },
  ];

  return (
    <div className="p-6 space-y-8 text-gray-900">

      {/* TOTAL ORDERS CARD */}
      <div className="p-6 bg-white shadow-lg rounded-2xl border border-gray-200 transition hover:shadow-xl">
        <h2 className="text-xl font-semibold text-gray-700">Total Orders</h2>
        <p className="text-5xl font-bold mt-3 text-indigo-600">58</p>
      </div>

      {/* ORDER GRAPH */}
      <div className="p-6 bg-white shadow-lg rounded-2xl border border-gray-200 transition hover:shadow-xl">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Orders Comparison</h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={ordersGraph} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#4B5563" />
            <YAxis stroke="#4B5563" />
            <Tooltip
              contentStyle={{ borderRadius: "8px", border: "1px solid #E5E7EB" }}
            />
            <Bar dataKey="orders" fill="#6366F1" radius={[8, 8, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* RECENT ORDERS TABLE */}
      <div className="p-6 bg-white shadow-lg rounded-2xl border border-gray-200 transition hover:shadow-xl">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Recent Orders</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-gray-600 font-medium tracking-wide">Order ID</th>
                <th className="py-3 px-4 text-gray-600 font-medium tracking-wide">Product</th>
                <th className="py-3 px-4 text-gray-600 font-medium tracking-wide">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 text-gray-700">{o.id}</td>
                  <td className="py-3 px-4 text-gray-700">{o.product}</td>
                  <td className="py-3 px-4 text-gray-900 font-semibold">${o.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
