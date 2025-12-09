"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import { createProduct } from "@/libs/api";
import { toast } from "react-toastify";

export default function AddProduct({ onClose }: any) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: any) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file: any) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages([...images, ...newImages]);
  };

  const handleSubmit = async () => {
    try {
      if (!title || !desc || !price || !category) {
        toast.error("Please fill all fields!");
        return;
      }

      if (!images || images.length === 0 || !images[0].file) {
        toast.error("Please upload an image!");
        return;
      }
      setLoading(true);
      // API Call
      const res = await createProduct(
        title,
        desc,
        price,
        category,
        images[0].file
      );
      console.log(res);
      if (res?.success) {
        setLoading(false);
        toast.success("Product added successfully");
      } else {
        setLoading(false);
        toast.error(res?.message || "Something went wrong");
      }
      onClose();
    } catch (error) {
      setLoading(false);
      toast.error("Unexpected error occurred");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          Add New Product
        </h2>

        {/* Form */}
        <div className="flex flex-col gap-4">
          {/* Title */}
          <input
            type="text"
            placeholder="Product Title"
            className="input-field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

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
          <input
            type="text"
            placeholder="Category"
            className="input-field"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          {/* Image Upload Box */}
          <label className="w-full border-2 border-dashed border-gray-300 rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition">
            <Upload size={28} className="text-gray-500" />
            <p className="text-gray-600 text-sm mt-2">Upload Product Images</p>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>

          {/* Image Preview */}
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-3">
              {images.map((img: any, idx: number) => (
                <img
                  key={idx}
                  src={img.preview}
                  className="w-full h-24 object-cover rounded-lg shadow"
                />
              ))}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl shadow-lg mt-4 transition w-full flex items-center justify-center"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
