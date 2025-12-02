"use client";

import React from "react";
import { ShoppingCart, Search, User, PackageSearch } from "lucide-react";
import { useRouter } from "next/navigation";

type HeaderProps = {
  search: string;
  setSearch: (value: string) => void;
};

export default function Header({ search, setSearch }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="bg-indigo-600 text-white shadow-md py-4">
      <div className="max-w-7xl mx-auto px-6">
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center">
          {/* Logo */}
          <h1
            className="text-3xl font-bold tracking-wide cursor-pointer"
            onClick={() => router.push("/")}
          >
            Premium Store
          </h1>

          {/* Search + Cart + Profile + Order Status */}
          <div className="flex items-center gap-6">
            {/* Search */}
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

            {/* Order Status */}
            <div
              className="cursor-pointer flex items-center gap-2 hover:text-gray-200 transition"
              onClick={() => router.push("/orderStatus")}
            >
              <PackageSearch size={24} />
              <span className="text-sm font-medium">Order Status</span>
            </div>

            {/* Profile Image (or default icon) */}
            <img
              src="/profile.png"
              onClick={() => router.push("/profile")}
              className="w-10 h-10 rounded-full border-2 border-white cursor-pointer hover:scale-110 transition object-cover"
              alt="Profile"
            />

            {/* Cart */}
            <div
              className="relative cursor-pointer hover:scale-110 transition"
              onClick={() => router.push("/cart")}
            >
              <ShoppingCart size={26} />
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-2">
                0
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex justify-between items-center md:hidden">
          {/* Logo */}
          <h1
            className="text-2xl font-bold tracking-wide cursor-pointer"
            onClick={() => router.push("/")}
          >
            Premium Store
          </h1>

          <div className="flex items-center gap-4">
            {/* Profile Image */}
            <img
              src="/profile.png"
              onClick={() => router.push("/profile")}
              className="w-9 h-9 rounded-full border border-white cursor-pointer"
            />

            {/* Order Status Icon */}
            <PackageSearch
              size={26}
              className="cursor-pointer"
              onClick={() => router.push("/orderStatus")}
            />

            {/* Cart */}
            <div
              className="relative cursor-pointer hover:scale-110 transition"
              onClick={() => router.push("/cart")}
            >
              <ShoppingCart size={26} />
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-2">
                0
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-3">
          <div className="relative w-full">
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
        </div>
      </div>
    </header>
  );
}
