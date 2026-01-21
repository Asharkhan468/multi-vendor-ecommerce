"use client";

import { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";
import {
  createProduct,
  getAllCategories,
  sendImageToText,
  updateProductWithId,
} from "@/libs/api";
import { toast } from "react-toastify";

export default function AddProduct({ onClose, editProduct }: any) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false); // AI loading
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    if (editProduct) {
      setTitle(editProduct.title);
      setDesc(editProduct.description);
      setPrice(editProduct.price);
      setCategory(editProduct.category);
      setStock(editProduct.stock);

      if (editProduct.image?.url) {
        setImages([{ file: null, preview: editProduct.image.url }]);
      }
    }
  }, [editProduct]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllCategories();
      if (res.success) setCategoryList(res.data.data);
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      if (!title || !desc || !price || !category) {
        toast.error("Please fill all fields!");
        return;
      }
      if (!images.length || (!editProduct && !images[0]?.file)) {
        toast.error("Please upload an image!");
        return;
      }

      setLoading(true);
      let res;
      if (editProduct) {
        res = await updateProductWithId(
          editProduct._id,
          title,
          desc,
          price,
          category,
          stock,
          images[0].file,
        );
      } else {
        res = await createProduct(
          title,
          desc,
          price,
          category,
          stock,
          images[0].file,
        );
      }

      if (res?.success) {
        toast.success(
          editProduct
            ? "Product updated successfully"
            : "Product added successfully",
        );
        onClose();
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // -------- AI Function --------
  const handleAIGenerate = async () => {
    if (!images[0]?.file) {
      toast.error("Please upload an image first!");
      return;
    }

    setAiLoading(true);
    try {
      const result = await sendImageToText(images[0].file);

      if (result.success) {
        // Fill title and description automatically
        setTitle(result.title || "");
        toast.success("AI generated title!");
      } else {
        toast.error(result.message || "AI generation failed");
      }
    } catch (error) {
      toast.error("Error generating with AI");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative animate-scaleIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          {editProduct ? "Edit Product" : "Add New Product"}
        </h2>

        <div className="flex flex-col gap-4">
          {/* Title + AI Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              placeholder="Product Title"
              className="input-field flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <button
              type="button"
              onClick={handleAIGenerate}
              disabled={aiLoading}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium px-4 py-3 rounded-lg shadow-lg transition-all duration-300 w-full sm:w-auto"
            >
              {aiLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span className="text-sm">Generate with AI</span>
                </>
              )}
            </button>
          </div>

          {/* Description */}
          <textarea
            placeholder="Product Description"
            className="input-field h-24"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          {/* Price + Stock */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Price"
              className="input-field"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Stock"
              className="input-field"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          {/* Category */}
          <select
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-700
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
            appearance-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              Select Category
            </option>
            {categoryList.map((cat: any, idx: any) => (
              <option key={idx} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Image Upload */}
          <label className="w-full border-2 border-dashed border-gray-300 rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition relative">
            {!images.length ? (
              <>
                <Upload size={28} className="text-gray-500" />
                <p className="text-gray-600 text-sm mt-2">
                  Upload Product Image
                </p>
                <input
                  type="file"
                  className="hidden"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file)
                      setImages([{ file, preview: URL.createObjectURL(file) }]);
                  }}
                />
              </>
            ) : (
              <div className="relative w-full">
                <img
                  src={images[0].preview}
                  className="w-full h-46 object-cover rounded-lg shadow"
                />
                <button
                  type="button"
                  onClick={() => setImages([])}
                  className="absolute top-2 right-2 bg-red-500 rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition"
                >
                  <X size={20} />
                </button>
              </div>
            )}
          </label>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl shadow-lg mt-4 transition w-full flex items-center justify-center"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              `${editProduct ? "Update Product" : "Add Product"}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
