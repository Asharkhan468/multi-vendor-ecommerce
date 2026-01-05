"use client";

import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, UserCog, Boxes } from "lucide-react";
import AdminProductsTable from "@/components/AdminProducts";
import AdminVendorsTable from "@/components/AdminVendors";
import AdminUsersTable from "@/components/AdminUsers";
import AdminOrdersComponent from "@/components/AdminOrders";
import AdminCategoriesComponent from "@/components/AdminCategories";
import { getAllProduct, getAllUsers, getAllVendors } from "@/libs/api";
import ProtectedRoute from "@/components/ProtectedRoutes";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Home");
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalVendors, setTotalVendors] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [productsList, setProductsList] = useState([]);
  const [vendorsData, setVendorsData] = useState([]);

  const fetchAllUsers = async () => {
    const res = await getAllUsers();
    if (res.success) {
      setTotalUsers(res.data.totalUsers);
    } else {
      console.log(res.message);
    }
  };

  const fetchAllVendors = async () => {
    const res = await getAllVendors();
    if (res.success) {
      setTotalVendors(res.data.totalVendors);
      setVendorsData(res.data.vendors);
    } else {
      console.log(res.message);
    }
  };

  const fetchAllProducts = async () => {
    const res = await getAllProduct();

    if (res.success) {
      const data = res.data.products;
      setTotalProducts(data.length);
      setProductsList(data);
    } else {
      console.log(res.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
    fetchAllVendors();
    fetchAllProducts();
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Total Vendors",
      value: totalVendors,
      icon: UserCog,
      color: "bg-green-500",
    },
    {
      title: "Total Products",
      value: totalProducts,
      icon: Boxes,
      color: "bg-purple-500",
    },
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

  const chartData = [
    {
      name: "Users",
      count: totalUsers,
    },
    {
      name: "Vendors",
      count: totalVendors,
    },
    {
      name: "Products",
      count: totalProducts,
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

  return (
    <>
      <ProtectedRoute role="admin">
        <div className="flex h-screen bg-gray-100">
          {/* Sidebar Component */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* MAIN CONTENT */}
          <main className="flex-1 p-6 overflow-auto mt-11 md:mt-0">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
              {activeTab}
            </h1>

            {/* Stats Cards */}
            {activeTab == "Home" && (
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
                          <div
                            className={`p-4 rounded-full text-white ${item.color}`}
                          >
                            <Icon size={28} />
                          </div>

                          <div>
                            <h3 className="text-gray-500 text-sm">
                              {item.title}
                            </h3>
                            <p className="text-3xl font-bold text-gray-800">
                              {item.value}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Graph Section */}
                <div className="mt-10 bg-white p-6 shadow-md rounded-xl border">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    System Overview
                  </h2>

                  <div className="w-full h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} barCategoryGap="25%">
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar
                          dataKey="count"
                          fill="#6366f1"
                          radius={[6, 6, 0, 0]}
                          barSize={70}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </>
            )}
            {activeTab == "Products" && (
              <AdminProductsTable
                products={productsList}
                onEdit={(id) => console.log("Edit", id)}
                onDelete={(id) => console.log("Delete", id)}
              />
            )}
            {activeTab == "Vendors" && (
              <AdminVendorsTable
                vendors={vendorsData}
                onEdit={(_id) => console.log("Edit", _id)}
                onDelete={(_id) => console.log("Delete", _id)}
              />
            )}
            {activeTab == "Users" && (
              <AdminUsersTable
                users={usersData}
                onEdit={(id) => console.log("Edit", id)}
                onDelete={(id) => console.log("Delete", id)}
              />
            )}
            {activeTab == "Orders" && <AdminOrdersComponent />}
            {activeTab == "Categories" && <AdminCategoriesComponent />}
          </main>
        </div>
      </ProtectedRoute>
    </>
  );
}
