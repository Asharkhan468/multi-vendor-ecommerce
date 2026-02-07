"use client";

import React, { useEffect, useState } from "react";
import { ShoppingCart, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "@/components/UserHeader";
import { getAllCategories, getAllProduct } from "@/libs/api";
import { toast } from "react-toastify";

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
  const [categories, setCategories] = useState([]);

  const router = useRouter();

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      if (res.success) {
        setCategories(res.data.data);
      } else {
        toast.error(res.message || "Failed to fetch categories");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

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
    fetchCategories();
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
      (p: any) => p.price >= 500 && p.price <= 1000,
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
        new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime(),
    );
  }

  //handle add to cart button

  const handleAddCart = (item: any) => {
    // Check for token
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null"); // Assuming you store user object

    if (!token || !user) {
      toast.error("Please login first to add items to cart!");
      router.push("/auth/login");
      return;
    }

    if (user.role !== "customer") {
      toast.error("Only customers can add items to cart!");
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const alreadyExists = existingCart.find(
      (cartItem: any) => cartItem._id === item._id,
    );

    if (alreadyExists) {
      toast.error("Item already in cart");
      return;
    }

    existingCart.push({
      ...item,
      quantity: 1,
    });

    localStorage.setItem("cart", JSON.stringify(existingCart));
    toast.success("Item added to cart");
  };
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
              {categories.map((cat: any) => (
                <option key={cat._id || cat} value={cat.name || cat}>
                  {cat.name || cat}
                </option>
              ))}
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

      <main className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Featured Products
        </h2>

        {loading ? (
          <div className="w-full flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product: any) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden relative"
              >
                {/* Image */}
                <div
                  onClick={() => router.push(`/products/${product._id}`)}
                  className="relative overflow-hidden cursor-pointer"
                >
                  <img
                    src={product.image.url}
                    alt={product.title}
                    className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Price Badges */}
                  {product.priceStatus === "low" && (
                    <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                      Best Deal 🔥
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-base font-semibold text-gray-800 line-clamp-1">
                    {product.title}
                  </h3>

                  <p className="text-sm text-gray-500">{product.category}</p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>

                    <button
                      onClick={() => handleAddCart(product)}
                      className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full 
            bg-indigo-600 text-white hover:bg-indigo-700 transition cursor-pointer"
                    >
                      <ShoppingCart size={16} />
                      Add
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
