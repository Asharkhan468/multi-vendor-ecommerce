"use client";

import { Edit, Trash2, Image as ImageIcon } from "lucide-react";

type Product = {
  id: string;
  title: string;
  price: number;
  stock: number;
  category: string;
  image?: string;
};

export default function AdminProductsTable({
  products,
  onEdit,
  onDelete,
}: {
  products: Product[];
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
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products?.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-12 h-12 rounded-md object-cover border"
                      />
                    ) : (
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-md border">
                        <ImageIcon size={20} className="text-gray-500" />
                      </div>
                    )}
                  </td>

                  <td className="p-3 font-medium text-gray-800">
                    {product.title}
                  </td>

                  <td className="p-3 text-gray-600">{product.category}</td>

                  <td className="p-3 text-gray-700">${product.price}</td>

                  <td
                    className={`p-3 font-semibold ${
                      product.stock > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.stock}
                  </td>

                  <td className="p-3 text-center flex items-center gap-3 justify-center">
                    <button
                      onClick={() => onEdit(product.id)}
                      className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
                    >
                      <Edit size={18} className="text-blue-600" />
                    </button>

                    <button
                      onClick={() => onDelete(product.id)}
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
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {products?.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="border rounded-xl p-4 shadow-sm bg-gray-50"
            >
              <div className="flex gap-4 items-center">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-20 h-20 rounded-lg object-cover border"
                  />
                ) : (
                  <div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-lg border">
                    <ImageIcon size={28} className="text-gray-500" />
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{product.category}</p>
                  <p className="font-bold text-gray-700">${product.price}</p>
                </div>
              </div>

              <div className="flex justify-between mt-4 items-center">
                <span
                  className={`font-semibold ${
                    product.stock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  Stock: {product.stock}
                </span>

                <div className="flex gap-3">
                  <button
                    onClick={() => onEdit(product.id)}
                    className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
                  >
                    <Edit size={18} className="text-blue-600" />
                  </button>

                  <button
                    onClick={() => onDelete(product.id)}
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
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}
