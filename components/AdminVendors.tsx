"use client";

import { blockUser, deleteUser } from "@/libs/api";
import {
  Edit,
  Trash2,
  Store as StoreIcon,
  Ban,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

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
  const [vendor, setVendor] = useState([]);

  const capitalizeFirst = (text = "") =>
    text.charAt(0).toUpperCase() + text.slice(1);

  const toggleVendorStatus = async (vendor: any) => {
    const newStatus = vendor.status === "active" ? "inactive" : "active";
    try {
      setVendor((prev: any) =>
        prev?.map((v: any) =>
          v._id === vendor._id ? { ...v, status: newStatus } : v,
        ),
      );
      const res = await blockUser(vendor._id, newStatus);
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.success("Status update failed");
    }
  };
  const handleDeleteUser = async (id: any) => {
    const res = await deleteUser(id);

    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-xl p-6 border border-gray-200">
      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 text-left">Profile</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {vendors?.length > 0 ? (
              vendors.map((vendor: any) => (
                <tr
                  key={vendor._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">
                    {vendor.profilePhoto ? (
                      <img
                        src={vendor.profilePhoto}
                        alt={vendor.profilePhoto}
                        className="w-12 h-12 rounded-md object-cover border"
                      />
                    ) : (
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-md border">
                        <StoreIcon size={20} className="text-gray-500" />
                      </div>
                    )}
                  </td>

                  <td className="p-3 text-gray-600">{vendor.name}</td>
                  <td className="p-3 text-gray-700">{vendor.email}</td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        vendor.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {capitalizeFirst(vendor.status)}
                    </span>
                  </td>

                  <td className="p-3 text-center flex items-center gap-3 justify-center">
                    <button
                      title={
                        vendor.status === "Active"
                          ? "Block vendor"
                          : "Activate vendor"
                      }
                      onClick={() => toggleVendorStatus(vendor)}
                      className={`p-2 rounded-lg transition ${
                        vendor.status === "Active"
                          ? "bg-red-100 hover:bg-red-200"
                          : "bg-green-100 hover:bg-green-200"
                      }`}
                    >
                      {vendor.status === "active" ? (
                        <Ban size={18} className="text-red-600" />
                      ) : (
                        <CheckCircle size={18} className="text-green-600" />
                      )}
                    </button>

                    <button
                      onClick={() => handleDeleteUser(vendor._id)}
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
      {/* <div className="md:hidden space-y-4">
        {vendors?.length > 0 ? (
          vendors.map((vendor:any) => (
            <div
              key={vendor._id}
              className="border rounded-xl p-4 shadow-sm bg-gray-50"
            >
              <div className="flex gap-4 items-center">
                {vendor.profilePhoto ? (
                  <img
                    src={vendor.profilePhoto}
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
                      vendor.status === "active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {capitalizeFirst(vendor.status)}
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
      </div> */}

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {vendors?.length > 0 ? (
          vendors.map((vendor: any) => (
            <div
              key={vendor._id}
              className="border rounded-xl p-4 shadow-sm bg-gray-50"
            >
              {/* TOP INFO */}
              <div className="flex gap-4 items-center">
                {vendor.profilePhoto ? (
                  <img
                    src={vendor.profilePhoto}
                    alt={vendor.shopName}
                    className="w-20 h-20 rounded-lg object-cover border"
                  />
                ) : (
                  <div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-lg border">
                    <StoreIcon size={28} className="text-gray-500" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="text-gray-600 text-sm truncate">
                    {vendor.name}
                  </p>
                  <p className="text-gray-600 text-sm truncate">
                    {vendor.email}
                  </p>

                  {/* STATUS BADGE */}
                  <span
                    className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      vendor.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {capitalizeFirst(vendor.status)}
                  </span>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex justify-between mt-4 items-center">
                <div className="flex gap-3">
                  {/* BLOCK / UNBLOCK */}
                  <button
                    title={
                      vendor.status === "active"
                        ? "Block vendor"
                        : "Activate vendor"
                    }
                    onClick={() => toggleVendorStatus(vendor)}
                    className={`p-2 rounded-lg transition ${
                      vendor.status === "active"
                        ? "bg-red-100 hover:bg-red-200"
                        : "bg-green-100 hover:bg-green-200"
                    }`}
                  >
                    {vendor.status === "active" ? (
                      <Ban size={18} className="text-red-600" />
                    ) : (
                      <CheckCircle size={18} className="text-green-600" />
                    )}
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => handleDeleteUser(vendor._id)}
                    className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition"
                  >
                    <Trash2 size={18} className="text-red-600" />
                  </button>
                </div>
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
