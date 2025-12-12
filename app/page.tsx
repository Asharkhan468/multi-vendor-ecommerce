"use client";

import React, { useEffect, useState } from "react";
import { ShoppingCart, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "@/components/UserHeader";
import { getAllProduct } from "@/libs/api";

type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  vendor: string;
  dateAdded: string;
};

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [vendor, setVendor] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [sort, setSort] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllProduct();

      if (res.success) {
        setProducts(res.data.products);
        setLoading(false);
      } else {
        console.log(res.message);
      }
    };

    fetchData();
  }, []);

  // ======== Filtering ========
  let filteredProducts = products.filter((product: any) => {
    return (
      product.title.toLowerCase().includes(search.toLowerCase()) &&
      (category ? product.category === category : true) &&
      (vendor ? product.vendor === vendor : true)
    );
  });

  // ======== Price Filter ========
  if (priceFilter === "low") {
    filteredProducts = filteredProducts.filter((p: any) => p.price < 500);
  }
  if (priceFilter === "medium") {
    filteredProducts = filteredProducts.filter(
      (p: any) => p.price >= 500 && p.price <= 1000
    );
  }
  if (priceFilter === "high") {
    filteredProducts = filteredProducts.filter((p: any) => p.price > 1000);
  }

  // ======== Sorting ========
  if (sort === "low-high") {
    filteredProducts.sort((a: any, b: any) => a.price - b.price);
  }
  if (sort === "high-low") {
    filteredProducts.sort((a: any, b: any) => b.price - a.price);
  }
  if (sort === "newest") {
    filteredProducts.sort(
      (a: any, b: any) =>
        new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
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
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              ⏷
            </span>
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
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              ⏷
            </span>
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
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              ⏷
            </span>
          </div>
        </div>
      </div>

      {/* ================= Products Section ================= */}
      {/* <main className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product: any) => (
            <div
              key={product._id}
              onClick={() => router.push(`/products/${product._id}`)}
              className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition duration-300 cursor-pointer"
            >
              <img
                src={product.image.url}
                alt={product.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.title}
                </h3>
                <p className="text-gray-500">{product.category}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-700">
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
      </main> */}



      <main className="max-w-7xl mx-auto px-6 py-10">
  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
    Featured Products
  </h2>

  {loading ? (
    <div className="w-full flex justify-center py-20">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {filteredProducts.map((product: any) => (
        <div
          key={product._id}
          onClick={() => router.push(`/products/${product._id}`)}
          className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition duration-300 cursor-pointer"
        >
          <img
            src={product.image.url}
            alt={product.title}
            className="w-full h-56 object-cover"
          />

          <div className="p-5">
            <h3 className="text-lg font-semibold text-gray-800">
              {product.title}
            </h3>
            <p className="text-gray-500">{product.category}</p>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xl font-bold text-gray-700">
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
  )}
</main>

    </div>
  );
}
