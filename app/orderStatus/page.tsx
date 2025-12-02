"use client";

import React from "react";
import { Package, Truck, CheckCircle2, Clock } from "lucide-react";

export default function OrderStatusPage() {
  const order = {
    id: "PS-482917",
    date: "Nov 30, 2025",
    total: 1490,
    status: "Shipped", // Processing | Shipped | Delivered | Cancelled
  };

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Header */}
      <div className="bg-indigo-600 text-white py-6 px-6 shadow-lg">
        <h1 className="text-3xl font-bold tracking-wide">Order Status</h1>
      </div>

      {/* Container */}
      <div className="max-w-3xl mx-auto p-6">
        
        {/* Order Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border">
          <h2 className="text-xl font-bold text-gray-900">Order #{order.id}</h2>
          <p className="text-gray-600 mt-1">Placed on: {order.date}</p>
          <p className="text-gray-600 mt-1">Total Amount: <b>Rs {order.total}</b></p>

          {/* Badge */}
          <span
            className={`mt-3 inline-block px-4 py-1 rounded-full text-sm font-semibold
              ${
                order.status === "Processing"
                  ? "bg-yellow-100 text-yellow-700"
                  : order.status === "Shipped"
                  ? "bg-blue-100 text-blue-700"
                  : order.status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
          >
            {order.status}
          </span>
        </div>

        {/* Timeline */}
        <div className="relative mt-10">

          {/* Vertical Line */}
          <div className="absolute left-6 top-0 h-full w-1 bg-gray-300 rounded-full"></div>

          {/* Step 1 */}
          <div className="flex items-start mb-10">
            <div className="bg-indigo-600 text-white p-3 rounded-full z-10">
              <Clock size={22} />
            </div>
            <div className="ml-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Order Processing
              </h3>
              <p className="text-gray-600">We have received your order.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start mb-10">
            <div
              className={`p-3 rounded-full z-10 ${
                order.status === "Shipped" || order.status === "Delivered"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              <Truck size={22} />
            </div>
            <div className="ml-6">
              <h3 className="text-lg font-semibold text-gray-900">Shipped</h3>
              <p className="text-gray-600">Your order is on the way.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start">
            <div
              className={`p-3 rounded-full z-10 ${
                order.status === "Delivered"
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              <CheckCircle2 size={22} />
            </div>
            <div className="ml-6">
              <h3 className="text-lg font-semibold text-gray-900">Delivered</h3>
              <p className="text-gray-600">Your order has been delivered.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
