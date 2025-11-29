"use client";

import { Edit, Trash2, Store as StoreIcon } from "lucide-react";

type Vendor = {
  id: string;
  shopName: string;
  ownerName: string;
  email: string;
  status: string;
  image?: string;
};

export default function AdminVendorsTable({
  vendors,
  onEdit,
  onDelete,
}: {
  vendors: Vendor[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="w-full bg-white shadow-lg rounded-xl p-6 border border-gray-200">
      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 text-left">Logo</th>
              <th className="p-3 text-left">Shop Name</th>
              <th className="p-3 text-left">Owner</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {vendors?.length > 0 ? (
              vendors.map((vendor) => (
                <tr
                  key={vendor.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">
                    {vendor.image ? (
                      <img
                        src={vendor.image}
                        alt={vendor.shopName}
                        className="w-12 h-12 rounded-md object-cover border"
                      />
                    ) : (
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-md border">
                        <StoreIcon size={20} className="text-gray-500" />
                      </div>
                    )}
                  </td>

                  <td className="p-3 font-medium text-gray-800">
                    {vendor.shopName}
                  </td>

                  <td className="p-3 text-gray-600">{vendor.ownerName}</td>
                  <td className="p-3 text-gray-700">{vendor.email}</td>

                  <td
                    className={`p-3 font-semibold ${
                      vendor.status === "Active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {vendor.status}
                  </td>

                  <td className="p-3 text-center flex items-center gap-3 justify-center">
                    <button
                      onClick={() => onEdit(vendor.id)}
                      className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
                    >
                      <Edit size={18} className="text-blue-600" />
                    </button>

                    <button
                      onClick={() => onDelete(vendor.id)}
                      className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition"
                    >
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No vendors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {vendors?.length > 0 ? (
          vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="border rounded-xl p-4 shadow-sm bg-gray-50"
            >
              <div className="flex gap-4 items-center">
                {vendor.image ? (
                  <img
                    src={vendor.image}
                    alt={vendor.shopName}
                    className="w-20 h-20 rounded-lg object-cover border"
                  />
                ) : (
                  <div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-lg border">
                    <StoreIcon size={28} className="text-gray-500" />
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {vendor.shopName}
                  </h3>
                  <p className="text-gray-600 text-sm">{vendor.ownerName}</p>
                  <p className="text-gray-700 text-sm">{vendor.email}</p>
                  <p
                    className={`font-bold ${
                      vendor.status === "Active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {vendor.status}
                  </p>
                </div>
              </div>

              <div className="flex justify-end mt-4 gap-3">
                <button
                  onClick={() => onEdit(vendor.id)}
                  className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
                >
                  <Edit size={18} className="text-blue-600" />
                </button>

                <button
                  onClick={() => onDelete(vendor.id)}
                  className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition"
                >
                  <Trash2 size={18} className="text-red-600" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 font-medium">
            No vendors found.
          </p>
        )}
      </div>
    </div>
  );
}
