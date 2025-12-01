"use client";
import React, { useState } from "react";
import Header from "@/components/UserHeader";

export default function CheckoutPage() {
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    payment: "cod",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Order Placed Successfully!\nThank you for shopping with us.");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header search={search} setSearch={setSearch} />

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>

        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col lg:flex-row gap-6">
          {/* Left: User & Address Form */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 space-y-5"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Delivery Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                required
                className="p-3 rounded-xl border placeholder:text-gray-700 border-gray-300 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="p-3 rounded-xl border placeholder:text-gray-700 border-gray-300 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
                className="p-3 rounded-xl border placeholder:text-gray-700 border-gray-300 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={form.address}
                onChange={handleChange}
                required
                className="p-3 rounded-xl border placeholder:text-gray-700 border-gray-300 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                required
                className="p-3 rounded-xl border placeholder:text-gray-700 border-gray-300 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                required
                className="p-3 rounded-xl border placeholder:text-gray-700 border-gray-300 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <input
                type="text"
                name="zip"
                placeholder="ZIP Code"
                value={form.zip}
                onChange={handleChange}
                required
                className="p-3 rounded-xl border placeholder:text-gray-700 border-gray-300 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Payment Method */}
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Payment Method
              </h2>
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  id="cod"
                  name="payment"
                  value="cod"
                  checked={form.payment === "cod"}
                  onChange={handleChange}
                  className="accent-indigo-600 w-5 h-5"
                />
                <label htmlFor="cod" className="text-gray-700 font-medium">
                  Cash on Delivery (COD)
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition"
            >
              Place Order
            </button>
          </form>

          {/* Right: Order Summary */}
          <div className="w-full lg:w-1/3 bg-gray-50 rounded-2xl p-5 shadow-inner">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Order Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>$998</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span>$20</span>
              </div>
              <div className="flex justify-between text-gray-800 font-bold text-lg border-t border-gray-300 pt-3">
                <span>Total</span>
                <span>$1018</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
