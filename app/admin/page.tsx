"use client";

import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { Users, UserCog, Boxes } from "lucide-react";
import AdminProductsTable from "@/components/AdminProducts";
import AdminVendorsTable from "@/components/AdminVendors";
import AdminUsersTable from "@/components/AdminUsers";
import AdminOrdersComponent from "@/components/AdminOrders";
import AdminCategoriesComponent from "@/components/AdminCategories";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Home");
  

  // Dashboard Stats
  const stats = [
    { title: "Total Users", value: 1200, icon: Users, color: "bg-blue-500" },
    { title: "Total Vendors", value: 85, icon: UserCog, color: "bg-green-500" },
    { title: "Total Products", value: 540, icon: Boxes, color: "bg-purple-500" },
  ];

  // Graph Data
  const data = [
    { name: "Jan", users: 400, products: 300 },
    { name: "Feb", users: 450, products: 320 },
    { name: "Mar", users: 500, products: 340 },
    { name: "Apr", users: 600, products: 380 },
    { name: "May", users: 750, products: 420 },
    { name: "Jun", users: 900, products: 500 },
  ];

  //products

  const productsList = [
  {
    id: "1",
    title: "iPhone 14 Pro",
    price: 1200,
    stock: 15,
    category: "Mobiles",
    image: "/iphone.png",
  },
  {
    id: "2",
    title: "Nike Shoes",
    price: 200,
    stock: 5,
    category: "Footwear",
    image: "/shoes.png",
  },
];

//users

const usersData = [
  {
    id: "u1",
    name: "John Carter",
    email: "john.carter@example.com",
    role: "Customer",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&q=80",
  },
  {
    id: "u2",
    name: "Sophia Martinez",
    email: "sophia.m@example.com",
    role: "Customer",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&q=80",
  },
  {
    id: "u3",
    name: "David Wilson",
    email: "david.wilson@example.com",
    role: "Customer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
  },
  {
    id: "u4",
    name: "Emily Johnson",
    email: "emily.j@example.com",
    role: "Customer",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80",
  },
];


//vendors


const vendorsData = [
  {
    id: "v1",
    shopName: "Tech Gear Store",
    ownerName: "Michael Smith",
    email: "michael@techgear.com",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=300&q=80",
  },
  {
    id: "v2",
    shopName: "Fashion Hub",
    ownerName: "Ava Thompson",
    email: "ava@fashionhub.com",
    status: "Inactive",
    image:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=300&q=80",
  },
  {
    id: "v3",
    shopName: "Smart Electronics",
    ownerName: "Daniel Evans",
    email: "daniel@smartelectronics.com",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=300&q=80",
  },
  {
    id: "v4",
    shopName: "Trendy Collections",
    ownerName: "Isabella Clark",
    email: "isabella@trendy.com",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=300&q=80",
  },
];


  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar Component */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 overflow-auto mt-11 md:mt-0">

        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {activeTab}
        </h1>

        {/* Stats Cards */}
       {
        activeTab=="Home" &&(
          <>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="p-5 bg-white rounded-xl shadow-md border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-full text-white ${item.color}`}>
                    <Icon size={28} />
                  </div>

                  <div>
                    <h3 className="text-gray-500 text-sm">{item.title}</h3>
                    <p className="text-3xl font-bold text-gray-800">{item.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Graph Section */}
        <div className="mt-10 bg-white p-6 shadow-md rounded-xl border">

          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Users & Products Growth
          </h2>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Bar dataKey="users" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="products" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
          </>
        )
       }
          {
        activeTab =="Products" && <AdminProductsTable  products={productsList}
      onEdit={(id) => console.log("Edit", id)}
      onDelete={(id) => console.log("Delete", id)}/>
      }
      {
        activeTab =="Vendors" && <AdminVendorsTable  vendors={vendorsData}
      onEdit={(id) => console.log("Edit", id)}
      onDelete={(id) => console.log("Delete", id)}/>
      }
      {
        activeTab =="Users" && <AdminUsersTable users={usersData}
      onEdit={(id) => console.log("Edit", id)}
      onDelete={(id) => console.log("Delete", id)}/>
      }
       {
        activeTab =="Orders" && <AdminOrdersComponent/>
      }
      {
        activeTab =="Categories" && <AdminCategoriesComponent/>
      }
      </main>
    
    </div>
  );
}
