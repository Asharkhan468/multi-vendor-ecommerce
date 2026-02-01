"use client";

import React, { useEffect, useState } from "react";
import { ShoppingCart, Star } from "lucide-react";
import { useParams } from "next/navigation";
import Header from "@/components/UserHeader";
import { analyzeReviews, createReview, getAllProduct } from "@/libs/api";
import { toast } from "react-toastify";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllProduct();
      if (res.success) {
        setProducts(res.data.products);
      }
    };
    fetchData();
  }, []);

  const product = products.find((p: any) => p._id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Product not found
      </div>
    );
  }

  const handleAddCart = (item: any) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const alreadyExists = existingCart.find(
      (cartItem: any) => cartItem._id === item._id,
    );

    if (alreadyExists) {
      toast.error("Item already in cart");
      return;
    }

    existingCart.push({ ...item, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(existingCart));
    toast.success("Added to cart");
  };
  const handleSubmit = async (productId: any) => {
    console.log("Product id ==> ", productId);
    const result = await createReview(productId, comment, rating);
    if (result?.review) {
      toast.success("Review added sucessfully!");
      setComment("");
      setRating(5);
    } else {
      toast.error("Error adding review");
    }
  };

 const handleAnalyzeReviews = async () => {
  try {
    setAnalyzing(true);
    const res = await analyzeReviews(product._id); // service function
    console.log("data ==> " , res)
    console.log(product._id)
    setAnalysis(res.data);
  } catch (error) {
    console.log(error);
  } finally {
    setAnalyzing(false);
  }
};

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header search={search} setSearch={setSearch} />

      {/* Product Info */}
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
  {/* Product Image */}
  <div className="overflow-hidden rounded-3xl shadow-xl hover:scale-105 transition-transform duration-500">
    <img
      src={product.image.url}
      alt={product.title}
      className="w-full h-[500px] md:h-[550px] object-cover object-center"
    />
  </div>

  {/* Product Details */}
  <div className="flex flex-col justify-between">
    <div>
      <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-3">
        {product.title}
      </h2>

      <span className="inline-block bg-indigo-50 text-indigo-600 px-4 py-1 rounded-full text-sm font-semibold mb-5">
        {product.category}
      </span>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={20}
            className="fill-yellow-400 text-yellow-400"
          />
        ))}
        <span className="text-gray-500 text-sm ml-2">(5.0)</span>
      </div>

      <span className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 block mb-6">
        ${product.price}
      </span>

      <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
        {product.description}
      </p>
    </div>

    {/* Add to Cart Button */}
    <button
      onClick={() => handleAddCart(product)}
      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-10 py-4 rounded-2xl flex items-center gap-3 justify-center shadow-xl hover:scale-105 transition-all duration-300"
    >
      <ShoppingCart size={22} />
      Add to Cart
    </button>
  </div>
</main>

      {/* Reviews Section */}
     <section className="max-w-7xl mx-auto px-6 py-14">

  {/* Header + Analyze Button */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
    <h3 className="text-3xl font-bold text-gray-900">
      Customer Reviews
    </h3>

    {product?.reviews?.length > 0 && (
      <button
        onClick={handleAnalyzeReviews}
        disabled={analyzing}
        className="bg-gradient-to-r from-indigo-600 to-blue-600
                   text-white px-6 py-3 rounded-2xl font-medium
                   hover:opacity-90 transition-all duration-300
                   disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {analyzing ? "Analyzing Reviews..." : "Analyze Reviews"}
      </button>
    )}
  </div>

  {/* AI Analysis Result */}
  {analysis && (
    <div className="mb-12 bg-gradient-to-r from-green-50 to-emerald-50
                    border border-green-200 rounded-3xl p-6 shadow-lg">
      <h4 className="text-xl font-semibold text-green-800 mb-4">
        Review Summary
      </h4>

      <div className="grid sm:grid-cols-2 gap-4 mb-4 text-gray-800">
        <p><b>Total Reviews:</b> {analysis.totalReviews}</p>
        <p><b>Average Rating:</b> ⭐ {analysis.averageRating}/5</p>
        <p><b>Overall Sentiment:</b> {analysis.sentiment}</p>
        <p><b>Top Pros:</b> {analysis.pros?.join(", ") || "N/A"}</p>
        <p><b>Top Cons:</b> {analysis.cons?.join(", ") || "N/A"}</p>
      </div>

      <p className="text-gray-700 leading-relaxed">
        {analysis.summary}
      </p>
    </div>
  )}

  {/* Reviews List */}
  <div className="space-y-6 mb-12">
    {product?.reviews?.length === 0 && (
      <p className="text-gray-500">No reviews yet</p>
    )}

    {product?.reviews?.map((review: any, index: number) => (
      <div
        key={index}
        className="bg-white p-6 rounded-3xl shadow-md
                   hover:shadow-lg transition-shadow duration-300"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3">
            <img
              src={review.userPhoto || "/avatar.png"}
              alt={review.userName}
              className="w-12 h-12 rounded-full object-cover
                         border border-gray-200"
            />

            <div>
              <h5 className="font-semibold text-gray-900">
                {review.userName}
              </h5>

              <div className="flex gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-400"
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          <span className="text-sm text-gray-400">
            {formatDate(review.date)}
          </span>
        </div>

        <p className="text-gray-700 leading-relaxed">
          {review.comment}
        </p>
      </div>
    ))}
  </div>

  {/* Add Review */}
  <div className="bg-gradient-to-r from-indigo-50 to-blue-50
                  p-6 rounded-3xl shadow-lg w-full">
    <h4 className="font-semibold mb-5 text-gray-900 text-lg">
      Write a Review
    </h4>

    <div className="grid gap-4">
      <textarea
        placeholder="Share your experience..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        className="w-full px-4 py-3 border rounded-2xl resize-none
                   text-black border-gray-300
                   focus:border-blue-500 focus:ring-1
                   focus:ring-blue-500 transition"
      />

      <div className="flex flex-col sm:flex-row
                      sm:items-center sm:justify-between gap-4">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={24}
              onClick={() => setRating(i)}
              className={`cursor-pointer transition-all duration-200
                ${i <= rating
                  ? "fill-yellow-400 text-yellow-400 scale-110"
                  : "text-gray-500"}`}
            />
          ))}
        </div>

        <button
          onClick={() => handleSubmit(product._id)}
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl
                     hover:bg-blue-700 transition-all duration-300"
        >
          Submit Review
        </button>
      </div>
    </div>
  </div>

</section>

    </div>
  );
}
