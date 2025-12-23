"use client";

import { getVendorOrders } from "@/libs/api";
import { useEffect, useRef, useState } from "react";

const statusStyles: any = {
  Preparing: "bg-yellow-100 text-yellow-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  pending: "bg-gray-100 text-gray-700",
};

export default function OrdersDashboard() {
  const [openMenu, setOpenMenu] = useState<any>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<any>({});
  const [menuPosition, setMenuPosition] = useState<any>({ top: 0, left: 0 });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // loader state

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true); // start loader
      const res = await getVendorOrders();
      if (res.success) {
        setOrders(res.data.orders);
      } else {
        console.log(res.message);
      }
      setLoading(false); // stop loader
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const updateStatus = (id: any, status: any) => {
    setOrders((prev: any) =>
      prev.map((order: any) =>
        order.orderId === id ? { ...order, status } : order
      )
    );
    setOpenMenu(null);
  };

  if (loading) {
    // loader / spinner
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 text-gray-900">
      {/* TOTAL ORDERS */}
      <div className="p-6 bg-white shadow-lg rounded-2xl ">
        <h2 className="text-xl font-semibold text-gray-700">Total Orders</h2>
        <p className="text-5xl font-bold mt-3 text-indigo-600">
          {orders.length}
        </p>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full table-fixed border-collapse text-left">
          <thead>
            <tr className="text-sm text-gray-500">
              <th className="px-4 py-2">Order</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o: any) => (
              <tr
                key={o.orderId}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition relative"
              >
                <td className="px-4 py-3 font-medium">{o.orderId}</td>
                <td className="px-4 py-3 text-gray-600">
                  {o.products[0].title}
                </td>
                <td className="px-4 py-3">{o.products[0].quantity}</td>{" "}
                {/* Quantity */}
                <td className="px-4 py-3 font-semibold">${o.totalAmount}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusStyles[o.status]
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right relative">
                  <div ref={menuRef} className="inline-block relative">
                    <button
                      ref={(el: any) => (buttonRefs.current[o.orderId] = el)}
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setMenuPosition({
                          top: rect.bottom + window.scrollY,
                          left: rect.right - 144 + window.scrollX,
                        });
                        setOpenMenu(openMenu === o.orderId ? null : o.orderId);
                      }}
                      className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
                    >
                      ⋮
                    </button>

                    {openMenu === o.orderId && (
                      <div
                        ref={menuRef}
                        style={{
                          top: menuPosition.top,
                          left: menuPosition.left,
                        }}
                        className="fixed w-36 bg-white rounded-xl shadow-xl z-50"
                      >
                        {["Preparing", "Shipped", "Delivered"].map((status) => (
                          <button
                            key={status}
                            onClick={() => updateStatus(o.orderId, status)}
                            className="block w-full px-4 py-2 text-sm text-left hover:bg-indigo-50"
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {orders.map((o: any) => (
          <div
            key={o.orderId}
            className="bg-white rounded-xl shadow p-4 space-y-2 relative"
          >
            <div className="flex justify-between">
              <span className="font-semibold">{o.orderId}</span>

              <div ref={menuRef} className="relative">
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === o.orderId ? null : o.orderId)
                  }
                  className="text-xl"
                >
                  ⋮
                </button>

                {openMenu === o.id && (
                  <div className="absolute right-0 top-10 w-36 bg-white rounded-xl shadow-xl border z-20">
                    {["Preparing", "Shipped", "Delivered"].map((status) => (
                      <button
                        key={status}
                        onClick={() => updateStatus(o.orderId, status)}
                        className="block w-full px-4 py-2 text-sm text-left hover:bg-indigo-50"
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <p className="text-gray-600 text-sm">
              {o.products[0].title} (Qty: {o.products[0].quantity})
            </p>

            <p className="font-semibold">${o.totalAmount}</p>

            <span
              className={`inline-block w-fit px-3 py-1 rounded-full text-xs font-semibold ${
                statusStyles[o.status]
              }`}
            >
              {o.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
