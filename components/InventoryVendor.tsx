"use client";

import { getAllProduct, getVendorProducts } from "@/libs/api";
import { Box, PackageSearch, Archive, Layers } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function InventoryStatus() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getVendorProducts();

      if (res.success) {
        setProducts(res.data.products);
      } else if (res.blocked) {
        localStorage.removeItem("token");
        toast.error(res.message);
        router.push("/auth/login");
      } else {
        console.log(res.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // 🔹 Calculations
  const totalProducts = products.length;

  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length;

  const outOfStock = products.filter((p) => p.stock === 0).length;

  const inventory = [
    {
      title: "Total Products",
      count: totalProducts,
      icon: <Box className="text-blue-500" />,
      color: "bg-blue-100",
    },
    {
      title: "Low Stock Items",
      count: lowStock,
      icon: <PackageSearch className="text-yellow-600" />,
      color: "bg-yellow-100",
    },
    {
      title: "Out of Stock",
      count: outOfStock,
      icon: <Archive className="text-red-600" />,
      color: "bg-red-100",
    },
  ];

  return (
    <div className="p-6 space-y-8 mt-12 ">
      {/* Top Inventory Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {inventory.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-white  border shadow hover:shadow-lg transition flex items-center gap-4"
          >
            <div className={`p-3 rounded-full ${item.color}`}>{item.icon}</div>
            <div className="text-black">
              <p className="text-sm">{item.title}</p>
              <h3 className="text-2xl font-bold">{item.count}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Product Table */}
      <div className="bg-white p-5 rounded-xl border shadow">
        <h3 className="text-xl font-semibold mb-4 text-black">
          Product Stock Details
        </h3>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100 text-black">
                  <th className="py-3 px-2">Product</th>
                  <th>Stock</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {products.map((p) => (
                  <tr
                    key={p._id}
                    className="text-black hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-2">{p.title}</td>
                    <td>{p.stock}</td>
                    <td
                      className={`font-semibold ${
                        p.stock === 0
                          ? "text-red-600"
                          : p.stock <= 5
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {p.stock === 0
                        ? "Out of Stock"
                        : p.stock <= 5
                        ? "Low Stock"
                        : "In Stock"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
