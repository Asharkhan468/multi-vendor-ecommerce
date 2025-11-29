"use client";

import { useState } from "react";
import { Plus, Folder, Trash2, Edit } from "lucide-react";

export default function AdminCategoriesComponent() {
  // demo categories
  const [categories, setCategories] = useState([
    { id: "cat-1", name: "Electronics", products: 120 },
    { id: "cat-2", name: "Fashion", products: 80 },
    { id: "cat-3", name: "Groceries", products: 200 },
  ]);

  const [newCategory, setNewCategory] = useState("");

  const createCategory = () => {
    if (!newCategory.trim()) return;
    const newCat = {
      id: `cat-${Date.now()}`,
      name: newCategory,
      products: 0,
    };
    setCategories([newCat, ...categories]);
    setNewCategory("");
  };

  const deleteCategory = (id: any) => {
    setCategories(categories.filter((cat) => cat.id !== id));
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
            onClick={createCategory}
            className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 flex items-center gap-2"
          >
            <Plus size={18} /> Add
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="p-4 bg-white rounded-2xl shadow-sm border flex flex-col justify-between"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Folder className="text-purple-600" size={22} />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-black">{cat.name}</h4>
                <p className="text-xs text-zinc-700">{cat.products} Products</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button className="p-2 text-gray-700 bg-zinc-100 hover:bg-zinc-200 rounded-lg">
                <Edit size={18} />
              </button>
              <button
                onClick={() => deleteCategory(cat.id)}
                className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}

        {categories.length === 0 && (
          <div className="text-center text-zinc-700 col-span-full py-10">
            No categories found.
          </div>
        )}
      </div>
    </section>
  );
}
