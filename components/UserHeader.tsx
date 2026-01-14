"use client";

import React, { useEffect, useRef, useState } from "react";
import { ShoppingCart, Search, PackageSearch } from "lucide-react";
import { useRouter } from "next/navigation";
import { getUserOrders } from "@/libs/api";

type HeaderProps = {
  search: string;
  setSearch: (value: string) => void;
};

export default function Header({ search, setSearch }: HeaderProps) {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [orders ,setOrders]=useState([]);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<any>("");
  const [role , setRole]=useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
      const fetchOrders = async () => {
        const res = await getUserOrders();
        if (res.success) {
          setOrders(res.data.orders);
        } else {
          console.log(res.message);
        }
      };
  
      fetchOrders();
    }, []);

  useEffect(() => {
    // Check token for login
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") as any);
    const image = user?.photo;
    setIsLoggedIn(!!token);
    setRole(user?.role)
    setProfile(image);



    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(cart);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/auth/login");
  };
  return (
    <header className="bg-indigo-600 text-white shadow-md py-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="hidden md:flex justify-between items-center">
          <h1
            className="text-3xl font-bold tracking-wide cursor-pointer"
            onClick={() => router.push("/")}
          >
            Premium Store
          </h1>
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
            {isLoggedIn && role=="customer"? (
              <div className="relative" ref={dropdownRef}>
                <img
                  src={profile}
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-10 h-10 rounded-full border-2 border-white cursor-pointer hover:scale-110 transition object-cover"
                  alt="Profile"
                />

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden animate-fadeIn">
                    <button
                      onClick={() => router.push("/profile")}
                      className="w-full text-left px-4 py-3 hover:bg-indigo-50 flex items-center gap-2"
                    >
                      Profile
                    </button>
                   {orders.length>0 && <button
                      onClick={() => router.push("/orderStatus")}
                      className="w-full text-left px-4 py-3 hover:bg-indigo-50 flex items-center gap-2"
                    >
                      Order Status
                    </button>}
                    <button
                      onClick={() => {
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-red-100 text-red-600 flex items-center gap-2"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => router.push("/auth/login")}
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Login
              </button>
            )}

            {/* Cart */}
            <div
              className="relative cursor-pointer hover:scale-110 transition"
              onClick={() => router.push("/cart")}
            >
              <ShoppingCart size={26} />
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-2">
                {cart.length}
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
            {/* Profile / Login */}
            {isLoggedIn ? (
              <img
                src="/profile.png"
                onClick={() => router.push("/profile")}
                className="w-9 h-9 rounded-full border border-white cursor-pointer"
              />
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="bg-white text-indigo-600 px-3 py-1 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Login
              </button>
            )}

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
                {cart.length}
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
