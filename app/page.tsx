"use client";

import InventoryStatus from "@/components/InventoryVendor";
import OrdersDashboard from "@/components/OrderPageVendor";
import OrderStatus from "@/components/OrderStatusVendor";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { MoreVertical, Plus } from "lucide-react";

const productsData = [
  {
    id: 1,
    title: "Product 1",
    description: "This is product 1 description.",
    images: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
    price: "50",
    stock: 20,
    category: "Electronics",
  },
  {
    id: 2,
    title: "Product 2",
    description: "This is product 2 description.",
    images: ["https://via.placeholder.com/150"],
    price: "30",
    stock: 15,
    category: "Clothing",
  },
];

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState("Home");

  const handleAddProduct = () => {
    alert("Open add product form here!");
  };

  const handleEditProduct = (id: number) => {
    alert(`Edit product with ID: ${id}`);
  };

  const handleDeleteProduct = (id: number) => {
    alert(`Delete product with ID: ${id}`);
  };

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <h2 className="text-3xl font-bold mb-6 text-black">{activeTab}</h2>

        {activeTab === "Home" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsData.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md p-5 flex flex-col border border-gray-200
                 hover:shadow-xl hover:-translate-y-1 transition-all duration-300
                 hover:border-purple-400/60 hover:shadow-purple-200 relative"
              >
                {/* 3 Dots Menu */}
                <button
                  onClick={() => handleEditProduct(product.id)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                >
                  <MoreVertical size={20} />
                </button>

                {/* Images */}
                <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={product.title}
                      className="w-28 h-28 object-cover rounded-lg shadow-sm hover:scale-105 transition-all duration-300"
                    />
                  ))}
                </div>

                {/* Details */}
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {product.description}
                </p>

                <div className="flex flex-col gap-1 text-sm">
                  <p className="font-semibold text-gray-900">
                    Price:{" "}
                    <span className="text-purple-600">${product.price}</span>
                  </p>
                  <p className="font-semibold text-gray-900">
                    Stock:{" "}
                    <span className="text-green-600">{product.stock}</span>
                  </p>
                  <p className="font-semibold text-gray-900">
                    Category:{" "}
                    <span className="text-blue-600">{product.category}</span>
                  </p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="mt-3 self-start text-red-500 hover:text-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Orders" && <OrdersDashboard />}
        {activeTab === "Order Status" && <OrderStatus />}
        {activeTab === "Inventory" && <InventoryStatus />}

        {/* Floating Add Button */}
        {activeTab === "Home" && (
          <button
            onClick={handleAddProduct}
            className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
          >
            <Plus size={24} />
          </button>
        )}
      </main>
    </div>
  );
}
