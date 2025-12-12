"use client";

import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useParams, useRouter } from "next/navigation"; // App Router
import Header from "@/components/UserHeader";

type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
};

const demoProducts: Product[] = [
  {
    id: "1",
    title: "Smartphone X",
    price: 799,
    image: "https://via.placeholder.com/600x400?text=Smartphone+X",
    category: "Electronics",
    description:
      "Smartphone X is the latest mobile device with advanced features and premium build quality.",
  },
  {
    id: "2",
    title: "Wireless Headphones",
    price: 199,
    image: "https://via.placeholder.com/600x400?text=Headphones",
    category: "Electronics",
    description:
      "Enjoy crystal-clear sound and wireless convenience with these premium headphones.",
  },
  {
    id: "3",
    title: "Gaming Laptop",
    price: 1299,
    image: "https://via.placeholder.com/600x400?text=Gaming+Laptop",
    category: "Computers",
    description:
      "High-performance gaming laptop with latest GPU and powerful CPU for smooth gameplay.",
  },
  {
    id: "4",
    title: "Smart Watch",
    price: 299,
    image: "https://via.placeholder.com/600x400?text=Smart+Watch",
    category: "Wearables",
    description:
      "Smart Watch keeps you connected and tracks your fitness goals effortlessly.",
  },
];

interface Props {
  params: { id: string }; // App Router params
}

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [search, setSearch] = useState("");

  console.log(id, "params");

  const product = demoProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Product not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header search={search} setSearch={setSearch} />

      {/* Product Detail */}
      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-96 object-cover rounded-3xl shadow-xl"
        />

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {product.title}
          </h2>
          <p className="text-gray-500 mb-4">{product.category}</p>
          <span className="text-2xl font-bold text-gray-900 mb-6 block">
            ${product.price}
          </span>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:from-blue-600 hover:to-indigo-600 transition">
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </main>
    </div>
  );
}
