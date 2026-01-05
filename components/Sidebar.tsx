"use client";

import { useState } from "react";
import {
  Home,
  ShoppingCart,
  Archive,
  Box,
  LogOut,
  Menu,
  X,
  Users,
  UserCog,
  Layers,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { logoutUser } from "@/libs/api";
import { toast } from "react-toastify";

export default function Sidebar({ activeTab, setActiveTab }: any) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const pannelName = path.includes("/admin") ? "Admin Pannel" : "Vendor Pannel";
  const router = useRouter();

  const vendorTabs = [
    { name: "Home", icon: Home },
    { name: "Orders", icon: ShoppingCart },
    { name: "Order Status", icon: Archive },
    { name: "Inventory", icon: Box },
  ];

  const adminTabs = [
    { name: "Home", icon: Home },
    { name: "Products", icon: ShoppingCart },
    { name: "Vendors", icon: UserCog },
    { name: "Users", icon: Users },
    { name: "Orders", icon: Archive },
    { name: "Categories", icon: Layers },
  ];

  const tabs = path.includes("/admin") ? adminTabs : vendorTabs;

  const handleLogout = async () => {
    const res = await logoutUser();

    if (res.success) {
      router.push("/auth/login");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Logout sucessfull");
    } else {
      console.log(res);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {/* ===== MOBILE TOP BAR ===== */}
      <div className="md:hidden fixed top-0 left-0 w-full flex justify-between items-center px-4 py-3 bg-indigo-600 text-white z-50">
        <h1 className="text-xl font-bold">{pannelName}</h1>
        <Menu className="w-7 h-7" onClick={() => setOpen(true)} />
      </div>

      {/* ===== MOBILE OVERLAY ===== */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden z-40"
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-indigo-600 text-white flex flex-col justify-between
          transform transition-transform duration-300 z-50
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
        `}
      >
        {/* ===== Top Section ===== */}
        <div>
          {/* Desktop Heading */}
          <h1 className="hidden md:block text-2xl font-bold p-6 border-b border-indigo-500">
            {pannelName}
          </h1>

          {/* Mobile Sidebar Header */}
          <div className="md:hidden flex justify-between items-center px-4 py-3 border-b border-indigo-500">
            <h1 className="text-xl font-bold">Vendor Panel</h1>
            <X className="w-6 h-6" onClick={() => setOpen(false)} />
          </div>

          {/* Tabs */}
          <nav className="p-4 space-y-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.name}
                  onClick={() => {
                    setActiveTab(tab.name);
                    setOpen(false);
                  }}
                  className={`w-full text-left flex items-center gap-3 p-3 rounded 
                    hover:bg-indigo-500 transition-colors ${
                      activeTab === tab.name ? "bg-indigo-700" : ""
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* ===== Logout Button ===== */}
        <div className="p-4 border-t border-indigo-500">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded hover:bg-indigo-500 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
