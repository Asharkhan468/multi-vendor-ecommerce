"use client";

import { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";
import { createProduct, getAllCategories } from "@/libs/api";
import { toast } from "react-toastify";

export default function AddProduct({ onClose }: any) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  const handleImageUpload = (e: any) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file: any) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages([...images, ...newImages]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllCategories();

      if (res.success) {
        setCategoryList(res.data.data);
        setLoading(false);
      } else {
        console.log(res.message);
      }
    };

    fetchData();
  }, []);

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
        stock,
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
          <div className="relative">
            <div className="relative">
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

              {/* Arrow Icon */}
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Arrow Icon */}
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {/* Image Upload Box */}
          {/* Image Upload Box with Preview & Remove */}
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
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImages([{ file, preview: URL.createObjectURL(file) }]);
                    }
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
