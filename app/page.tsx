"use client";

import React, { useState } from "react";
import { ShoppingCart, Search } from "lucide-react";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
};

const demoProducts: Product[] = [
  {
    id: "1",
    title: "Smartphone X",
    price: 799,
    image: "https://via.placeholder.com/400x300?text=Smartphone+X",
    category: "Electronics",
  },
  {
    id: "2",
    title: "Wireless Headphones",
    price: 199,
    image: "https://via.placeholder.com/400x300?text=Headphones",
    category: "Electronics",
  },
  {
    id: "3",
    title: "Gaming Laptop",
    price: 1299,
    image: "https://via.placeholder.com/400x300?text=Gaming+Laptop",
    category: "Computers",
  },
  {
    id: "4",
    title: "Smart Watch",
    price: 299,
    image: "https://via.placeholder.com/400x300?text=Smart+Watch",
    category: "Wearables",
  },
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredProducts = demoProducts.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ================= Header ================= */}
     <header className="bg-indigo-600 text-white shadow-md py-4">
  <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

    {/* Logo */}
    <h1 className="text-3xl font-bold tracking-wide">
      Premium Store
    </h1>

    {/* RIGHT SIDE GROUP: Search + Cart */}
    <div className="flex items-center gap-6">

      {/* Search Box */}
      <div className="relative w-64">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white text-gray-800 pl-10 pr-4 py-2 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* Cart Icon */}
      <div className="relative cursor-pointer hover:scale-110 transition">
        <ShoppingCart size={28} />
        <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-2">
          0
        </span>
      </div>

    </div>
  </div>
</header>


      {/* ================ Products Section ================= */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => router.push(`/products/${product.id}`)}
              className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition duration-300 cursor-pointer"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.title}
                </h3>
                <p className="text-gray-500 mt-1">{product.category}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                    ${product.price}
                  </span>

                  <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-2 rounded-xl flex items-center gap-2 hover:from-blue-600 hover:to-indigo-600 transition">
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
