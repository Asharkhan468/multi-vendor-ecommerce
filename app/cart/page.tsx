"use client";
import React, { useEffect, useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import Header from "@/components/UserHeader";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(cart);
  }, []);

  // Increase quantity
  const handleIncrease = (id: number) => {
    setCart((prev: any) =>
      prev.map((item: any) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity
  const handleDecrease = (id: number) => {
    setCart((prev: any) =>
      prev.map((item: any) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id: any) => {
    setCart((prev: any) => {
      const updatedCart = prev.filter((item: any) => item._id !== id);

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  // Cart total
  const totalAmount = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  // // Checkout handler

  // Checkout handler
  const handleCheckout = () => {
    localStorage.setItem("checkoutProducts", JSON.stringify(cart));

    localStorage.setItem("checkoutTotal", JSON.stringify(totalAmount));

    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header search={search} setSearch={setSearch} />

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>

        {/* Cart Items */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              Your cart is empty.
            </p>
          ) : (
            cart.map((item: any) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-5 border-b pb-5"
              >
                {/* Product Image */}
                <img
                  src={item.image.url}
                  className="w-28 h-28 rounded-xl object-cover shadow-md"
                />

                {/* Product Details */}
                <div className="flex-1 w-full">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-gray-500">${item.price}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 mt-3">
                    <button
                      onClick={() => handleDecrease(item._id)}
                      className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                    >
                      <Minus size={18} />
                    </button>

                    <span className="text-lg font-semibold text-gray-800">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => handleIncrease(item._id)}
                      className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                {/* Right Side Price & Delete */}
                <div className="flex flex-col items-center sm:items-end gap-3">
                  <p className="text-xl font-bold text-gray-800">
                    ${item.price * item.quantity}
                  </p>

                  <button
                    onClick={() => handleRemove(item._id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Total Section with Checkout */}
        {cart.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-800">Total:</h2>
            <p className="text-3xl font-bold text-indigo-600">${totalAmount}</p>
            <button
              onClick={handleCheckout}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
