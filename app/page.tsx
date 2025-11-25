"use client";

import Sidebar from "@/components/Sidebar";
import { useState } from "react";

const productsData = [
  {
    id: 1,
    title: "Product 1",
    description: "This is product 1 description.",
    images: ["https://www.freepik.com/free-vector/mask-conditioner-bottles-vector-realistic-product-placement-label-designs_19552578.htm#fromView=keyword&page=1&position=3&uuid=52cceeb7-1cc4-4c3a-bd9f-a2ff67ad8753&query=Product", "https://via.placeholder.com/150"],
    price: "$50",
    stock: 20,
    category: "Electronics",
  },
  {
    id: 2,
    title: "Product 2",
    description: "This is product 2 description.",
    images: ["https://via.placeholder.com/150"],
    price: "$30",
    stock: 15,
    category: "Clothing",
  },
];

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <h2 className="text-3xl font-bold mb-6">{activeTab}</h2>

        {activeTab === "Home" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsData.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
                {/* Images */}
                <div className="flex gap-2 mb-4 overflow-x-auto">
                  {product.images.map((img, idx) => (
                    <img key={idx} src={img} alt={product.title} className="w-24 h-24 object-cover rounded" />
                  ))}
                </div>

                {/* Details */}
                <h3 className="text-xl font-semibold">{product.title}</h3>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="font-medium">Price: {product.price}</p>
                <p className="font-medium">Stock: {product.stock}</p>
                <p className="font-medium">Category: {product.category}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Orders" && <p>Here you can see all your orders.</p>}
        {activeTab === "Order Status" && <p>Track order status here.</p>}
        {activeTab === "Inventory" && <p>Manage your stock here.</p>}
      </main>
    </div>
  );
}
