"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Package, Truck, ShoppingBag, Clock } from "lucide-react";
import { OrderCard } from "./OrderCard";
import { getVendorOrders } from "@/libs/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function OrdersDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true); // start loader
      const res = await getVendorOrders();
      if (res.success) {
        setOrders(res.data.orders);
        console.log(res.data.orders);
      } else if (res.blocked) {
         localStorage.removeItem("token");
      toast.error(res.message);
      router.push("/auth/login")
      } else {
        console.log(res.message);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  // status wise counts
  const pendingOrders = orders.filter((o: any) => o.status === "pending");
  const preparingOrders = orders.filter((o: any) => o.status === "Preparing");
  const shippedOrders = orders.filter((o: any) => o.status === "Shipped");
  const deliveredOrders = orders.filter((o: any) => o.status === "Delivered");

  // chart ke liye data
  const statusCount = [
    { name: "Pending", value: pendingOrders.length },
    { name: "Preparing", value: preparingOrders.length },
    { name: "Shipped", value: shippedOrders.length },
    { name: "Delivered", value: deliveredOrders.length },
  ];

  const COLORS = ["#FACC15", "#60A5FA", "#34D399", "#A78BFA"];

  return (
    <div className="p-6 space-y-6 text-gray-900">
      {/* TOP CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <OrderCard
          title="Pending"
          value={pendingOrders.length}
          icon={<Clock className="text-yellow-500" />}
        />

        <OrderCard
          title="Preparing"
          value={preparingOrders.length}
          icon={<ShoppingBag className="text-blue-500" />}
        />

        <OrderCard
          title="Shipped"
          value={shippedOrders.length}
          icon={<Truck className="text-green-500" />}
        />

        <OrderCard
          title="Delivered"
          value={deliveredOrders.length}
          icon={<Package className="text-purple-600" />}
        />
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BAR CHART */}
        <div className="p-4 bg-white  rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Orders Status Chart
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusCount}>
              <XAxis dataKey="name" stroke="#4B5563" />
              <YAxis stroke="#4B5563" />
              <Tooltip />
              <Bar dataKey="value">
                {statusCount.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="p-4 bg-white  rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">
            Orders Distribution
          </h3>

          <ResponsiveContainer width={280} height={280}>
            <PieChart>
              <Pie data={statusCount} dataKey="value" outerRadius={110} label>
                {statusCount.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
