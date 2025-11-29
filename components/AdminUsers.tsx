"use client";

import { Edit, Trash2, User as UserIcon } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
  image?: string;
};

export default function AdminUsersTable({
  users,
  onEdit,
  onDelete,
}: {
  users: User[];
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
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users?.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-12 h-12 rounded-md object-cover border"
                      />
                    ) : (
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-md border">
                        <UserIcon size={20} className="text-gray-500" />
                      </div>
                    )}
                  </td>

                  <td className="p-3 font-medium text-gray-800">
                    {user.name}
                  </td>

                  <td className="p-3 text-gray-600">{user.email}</td>
                  <td className="p-3 text-gray-700">{user.role}</td>

                  <td className="p-3 text-center flex items-center gap-3 justify-center">
                    <button
                      onClick={() => onEdit(user.id)}
                      className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
                    >
                      <Edit size={18} className="text-blue-600" />
                    </button>

                    <button
                      onClick={() => onDelete(user.id)}
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
                  colSpan={5}
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {users?.length > 0 ? (
          users.map((user) => (
            <div
              key={user.id}
              className="border rounded-xl p-4 shadow-sm bg-gray-50"
            >
              <div className="flex gap-4 items-center">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-20 h-20 rounded-lg object-cover border"
                  />
                ) : (
                  <div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-lg border">
                    <UserIcon size={28} className="text-gray-500" />
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {user.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                  <p className="font-bold text-gray-700">{user.role}</p>
                </div>
              </div>

              <div className="flex justify-between mt-4 items-center">
                <div className="flex gap-3">
                  <button
                    onClick={() => onEdit(user.id)}
                    className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
                  >
                    <Edit size={18} className="text-blue-600" />
                  </button>

                  <button
                    onClick={() => onDelete(user.id)}
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
            No users found.
          </p>
        )}
      </div>
    </div>
  );
}
