"use client";

import { useEffect, useState } from "react";
import { Plus, Folder, Trash2, Edit, Check, X } from "lucide-react";
import {
  createCategory,
  deleteCategoryWithId,
  getAllCategories,
  updateCategoryWithId,
} from "@/libs/api";
import { toast } from "react-toastify";

export default function AdminCategoriesComponent() {
  const [categories, setCategories] = useState<any[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getAllCategories();
      if (res.success) {
        setCategories(res.data.data);
      } else {
        toast.error(res.message || "Failed to fetch categories");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      const res = await createCategory(newCategory);
      if (res.success) {
        fetchCategories();
        toast.success("Category created successfully");
        setNewCategory("");
      } else {
        toast.error(res.message || "Failed to create category");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const res = await deleteCategoryWithId(id);
      if (res.success) {
        setCategories(categories.filter((cat) => cat._id !== id));
        toast.success("Category deleted successfully");
      } else {
        toast.error(res.message || "Failed to delete category");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleEditCategory = (id: string, name: string) => {
    setEditingId(id);
    setEditingName(name);
  };

  const handleUpdateCategory = async (id: string) => {
    if (!editingName.trim()) return;

    try {
      const res = await updateCategoryWithId(id, editingName);
      if (res.success) {
        fetchCategories();
        toast.success("Category updated successfully");
        setEditingId(null);
        setEditingName("");
      } else {
        toast.error(res.message || "Failed to update category");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <section className="w-full p-4 md:p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">
            Manage Categories
          </h2>
          <p className="text-sm text-gray-600">
            Create and manage all product categories.
          </p>
        </div>
      </header>

      {/* Create Category Box */}
      <div className="p-4 bg-white rounded-2xl shadow-sm border mb-6">
        <h3 className="text-lg font-medium mb-3 text-black">
          Create New Category
        </h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter category name..."
            className="flex-1 border border-gray-300 rounded-xl p-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleCreateCategory}
            className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 flex items-center gap-2"
          >
            <Plus size={18} /> Add
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading && (
          <div className="flex justify-center items-center py-16 col-span-full">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {!loading &&
          categories.map((cat) => (
            <div
              key={cat._id}
              className="p-4 bg-white rounded-2xl shadow-sm border flex flex-col justify-between"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Folder className="text-purple-600" size={22} />
                </div>

                {editingId === cat._id ? (
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="border text-black border-gray-600 rounded-xl p-2 flex-1"
                  />
                ) : (
                  <h4 className="text-lg font-semibold text-black">
                    {cat.name}
                  </h4>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-4">
                {editingId === cat._id ? (
                  <>
                    <button
                      onClick={() => handleUpdateCategory(cat._id)}
                      className="p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg"
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg"
                    >
                      <X size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditCategory(cat._id, cat.name)}
                      className="p-2 text-gray-700 bg-zinc-100 hover:bg-zinc-200 rounded-lg"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(cat._id)}
                      className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}

        {!loading && categories.length === 0 && (
          <div className="text-center text-zinc-700 col-span-full py-10">
            No categories found.
          </div>
        )}
      </div>
    </section>
  );
}
