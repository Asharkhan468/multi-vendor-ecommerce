"use client";

import {
  deleteProductWithId,
  getAllCategories,
  updateProductWithId,
} from "@/libs/api";
import { Edit, Trash2, Image as ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editData, setEditData] = useState<any>({
    id: "",
    title: "",
    category: "",
    price: "",
    stock: "",
  });
  const [imagePreview, setImagePreview] = useState<any>(null);

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      if (res.success) {
        setCategories(res.data.data);
      } else {
        toast.error(res.message || "Failed to fetch categories");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isEditOpen && editData.image && typeof editData.image === "string") {
      setImagePreview(editData.image);
    }
  }, [isEditOpen, editData.image]);

  const handleDelete = async (id: any) => {
    const res = await deleteProductWithId(id);

    if (res.success) {
      toast.success("Product deleted successfully");
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleUpdateProduct = async () => {
    console.log("Updated Data:", editData);
    const res = await updateProductWithId(
      editData.id,
      editData.title,
      editData.description,
      editData.price,
      editData.category,
      editData.stock,
      editData.image
    );

    if (res.success) {
      toast.success("Product updated sucessfully");
    } else {
      toast.error("Something went wrong try again later");
    }
    setIsEditOpen(false);
  };

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
              products.map((product: any) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">
                    {product.image ? (
                      <img
                        src={product.image.url}
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
                      onClick={() => {
                        setEditData({
                          id: product._id,
                          title: product.title,
                          category: product.category,
                          price: product.price,
                          stock: product.stock,
                          image: product.image?.url || null,
                        });
                        setIsEditOpen(true);
                      }}
                      className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
                    >
                      <Edit size={18} className="text-blue-600" />
                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
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
          products.map((product: any) => (
            <div
              key={product._id}
              className="border rounded-xl p-4 shadow-sm bg-gray-50"
            >
              <div className="flex gap-4 items-center">
                {product.image ? (
                  <img
                    src={product.image.url}
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
                    onClick={() => {
                      setEditData({
                        id: product._id,
                        title: product.title,
                        category: product.category,
                        price: product.price,
                        stock: product.stock,
                        image: product.image.url,
                      });
                      setIsEditOpen(true);
                    }}
                    className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
                  >
                    <Edit size={18} className="text-blue-600" />
                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
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

      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Edit Product
            </h2>

            {/* Image */}
            <div>
              {/* Preview with cross */}
              {imagePreview ? (
                <div className="relative mb-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg border"
                  />

                  {/* Cross button */}
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setEditData({ ...editData, image: null });
                    }}
                    className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-black"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                // Styled upload box
                <label className="w-full h-40 flex items-center justify-center border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-pointer mb-3 hover:bg-gray-100">
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e: any) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      setEditData({ ...editData, image: file });
                      setImagePreview(URL.createObjectURL(file));
                    }}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  className="w-full border text-gray-700 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>

                <div className="relative">
                  <select
                    value={editData.category}
                    onChange={(e) =>
                      setEditData({ ...editData, category: e.target.value })
                    }
                    className="w-full appearance-none border border-gray-300 text-gray-700 rounded-lg py-2 pl-3 pr-10 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Category</option>

                    {categories.map((cat: any) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>

                  {/* Custom Arrow */}
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                    ▼
                  </div>
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  value={editData.price}
                  onChange={(e) =>
                    setEditData({ ...editData, price: e.target.value })
                  }
                  className="w-full border border-gray-300 text-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  value={editData.stock}
                  onChange={(e) =>
                    setEditData({ ...editData, stock: e.target.value })
                  }
                  className="w-full border border-gray-300 text-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsEditOpen(false)}
                className="px-4 py-2 rounded-lg  bg-gray-500 text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateProduct}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
