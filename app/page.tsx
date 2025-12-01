"use client";

import React, { useState } from "react";
import { ShoppingCart, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "@/components/UserHeader";

type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  vendor: string;
  dateAdded: string;
};

const demoProducts: Product[] = [
  {
    id: "1",
    title: "Smartphone X",
    price: 799,
    image: "https://via.placeholder.com/400x300?text=Smartphone+X",
    category: "Electronics",
    vendor: "Apple",
    dateAdded: "2024-01-10",
  },
  {
    id: "2",
    title: "Wireless Headphones",
    price: 199,
    image: "https://via.placeholder.com/400x300?text=Headphones",
    category: "Electronics",
    vendor: "Sony",
    dateAdded: "2024-02-05",
  },
  {
    id: "3",
    title: "Gaming Laptop",
    price: 1299,
    image: "https://via.placeholder.com/400x300?text=Gaming+Laptop",
    category: "Computers",
    vendor: "Dell",
    dateAdded: "2024-03-02",
  },
  {
    id: "4",
    title: "Smart Watch",
    price: 299,
    image: "https://via.placeholder.com/400x300?text=Smart+Watch",
    category: "Wearables",
    vendor: "Samsung",
    dateAdded: "2024-01-30",
  },
  {
    id: "5",
    title: "Smart Watch",
    price: 299,
    image: "https://via.placeholder.com/400x300?text=Smart+Watch",
    category: "Wearables",
    vendor: "Samsung",
    dateAdded: "2024-01-30",
  },
  {
    id: "6",
    title: "Smart Watch",
    price: 299,
    image: "https://via.placeholder.com/400x300?text=Smart+Watch",
    category: "Wearables",
    vendor: "Samsung",
    dateAdded: "2024-01-30",
  },
  {
    id: "7",
    title: "Smart Watch",
    price: 299,
    image: "https://via.placeholder.com/400x300?text=Smart+Watch",
    category: "Wearables",
    vendor: "Samsung",
    dateAdded: "2024-01-30",
  },
  {
    id: "8",
    title: "Smart Watch",
    price: 299,
    image: "https://via.placeholder.com/400x300?text=Smart+Watch",
    category: "Wearables",
    vendor: "Samsung",
    dateAdded: "2024-01-30",
  },
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [vendor, setVendor] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [sort, setSort] = useState("");

  const router = useRouter();

  // ======== Filtering ========
  let filteredProducts = demoProducts.filter((product) => {
    return (
      product.title.toLowerCase().includes(search.toLowerCase()) &&
      (category ? product.category === category : true) &&
      (vendor ? product.vendor === vendor : true)
    );
  });

  // ======== Price Filter ========
  if (priceFilter === "low") {
    filteredProducts = filteredProducts.filter((p) => p.price < 500);
  }
  if (priceFilter === "medium") {
    filteredProducts = filteredProducts.filter((p) => p.price >= 500 && p.price <= 1000);
  }
  if (priceFilter === "high") {
    filteredProducts = filteredProducts.filter((p) => p.price > 1000);
  }

  // ======== Sorting ========
  if (sort === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }
  if (sort === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }
  if (sort === "newest") {
    filteredProducts.sort(
      (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= Header ================= */}
          <Header search={search} setSearch={setSearch} />


      {/* ================= Filters ================= */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <h2 className="text-xl font-semibold mb-4 text-black">Filters</h2>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

  {/* Category */}
  <div className="relative">
    <select
      className="p-3 pr-10 rounded-xl border border-gray-400 bg-white text-gray-900 font-semibold appearance-none w-full"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="">All Categories</option>
      <option value="Electronics">Electronics</option>
      <option value="Computers">Computers</option>
      <option value="Wearables">Wearables</option>
    </select>
    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">⏷</span>
  </div>

  {/* Vendor */}
  <div className="relative">
    <select
      className="p-3 pr-10 rounded-xl border border-gray-400 bg-white text-gray-900 font-semibold appearance-none w-full"
      value={vendor}
      onChange={(e) => setVendor(e.target.value)}
    >
      <option value="">All Vendors</option>
      <option value="Apple">Apple</option>
      <option value="Sony">Sony</option>
      <option value="Dell">Dell</option>
      <option value="Samsung">Samsung</option>
    </select>
    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">⏷</span>
  </div>

  {/* Price */}
  <div className="relative">
    <select
      className="p-3 pr-10 rounded-xl border border-gray-400 bg-white text-gray-900 font-semibold appearance-none w-full"
      value={priceFilter}
      onChange={(e) => setPriceFilter(e.target.value)}
    >
      <option value="">All Prices</option>
      <option value="low">Low (&lt; $500)</option>
      <option value="medium">Medium ($500 - $1000)</option>
      <option value="high">High (&gt; $1000)</option>
    </select>
    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">⏷</span>
  </div>

  {/* Sorting */}
  <div className="relative">
    <select
      className="p-3 pr-10 rounded-xl border border-gray-400 bg-white text-gray-900 font-semibold appearance-none w-full"
      value={sort}
      onChange={(e) => setSort(e.target.value)}
    >
      <option value="">Sort By</option>
      <option value="low-high">Price: Low to High</option>
      <option value="high-low">Price: High to Low</option>
      <option value="newest">Newest</option>
    </select>
    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">⏷</span>
  </div>

</div>

      </div>

      {/* ================= Products Section ================= */}
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
              <img src={product.image} alt={product.title} className="w-full h-56 object-cover" />

              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                <p className="text-gray-500">{product.category} • {product.vendor}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-700">${product.price}</span>

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
