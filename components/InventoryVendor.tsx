"use client";

import { Box, PackageSearch, Archive, Layers } from "lucide-react";

export default function InventoryStatus() {
  const inventory = [
    {
      title: "Total Products",
      count: 120,
      icon: <Box className="text-blue-500" />,
      color: "bg-blue-100",
    },
    {
      title: "Low Stock Items",
      count: 8,
      icon: <PackageSearch className="text-red-500" />,
      color: "bg-red-100",
    },
    {
      title: "Out of Stock",
      count: 3,
      icon: <Archive className="text-gray-600" />,
      color: "bg-gray-200",
    },
    {
      title: "Categories",
      count: 12,
      icon: <Layers className="text-purple-600" />,
      color: "bg-purple-100",
    },
  ];

  const productList = [
    { name: "Wireless Headphones", stock: 12 },
    { name: "Laptop Bag", stock: 4 },
    { name: "Bluetooth Speaker", stock: 0 },
    { name: "Smart Watch", stock: 19 },
    { name: "USB Keyboard", stock: 3 },
  ];

  const getStockColor = (stock: number) => {
    if (stock === 0) return "text-red-600 font-semibold";
    if (stock <= 5) return "text-yellow-600 font-semibold";
    return "text-green-600 font-semibold";
  };

  return (
    <div className="p-6 space-y-8 mt-12">
      {/* Heading */}

      {/* Top Inventory Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {inventory.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-white border shadow hover:shadow-lg transition flex items-center gap-4 cursor-pointer"
          >
            <div className={`p-3 rounded-full ${item.color}`}>{item.icon}</div>

            <div>
              <p className="text-gray-600 text-sm">{item.title}</p>
              <h3 className="text-2xl font-bold text-black">{item.count}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-5 rounded-xl border shadow">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Product Stock Details
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-2 font-semibold text-gray-900">
                  Product
                </th>
                <th className="font-semibold text-gray-900">Stock</th>
                <th className="font-semibold text-gray-900">Status</th>
              </tr>
            </thead>

            <tbody>
              {productList.map((p, idx) => (
                <tr
                  key={idx}
                  className=" hover:bg-gray-50 transition text-gray-800"
                >
                  <td className="py-3 px-2">{p.name}</td>
                  <td className="font-medium">{p.stock}</td>
                  <td
                    className={`font-semibold ${
                      p.stock === 0
                        ? "text-red-600"
                        : p.stock <= 5
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {p.stock === 0
                      ? "Out of Stock"
                      : p.stock <= 5
                      ? "Low Stock"
                      : "In Stock"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
