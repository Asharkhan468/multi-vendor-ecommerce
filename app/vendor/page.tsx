"use client";

import InventoryStatus from "@/components/InventoryVendor";
import OrdersDashboard from "@/components/OrderPageVendor";
import OrderStatus from "@/components/OrderStatusVendor";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { MoreVertical, Plus } from "lucide-react";
import AddProduct from "@/components/AddProduct";
import { deleteProductWithId, getVendorProducts } from "@/libs/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoutes";

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState("Home");
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState<any>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const closeMenu = () => setOpenMenuId(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const res = await getVendorProducts();

    console.log(res);
    if (res.success) {
      setProducts(res.data.products);
      setLoading(false);
    } else if (res.blocked) {
      setLoading(false);
      localStorage.removeItem("token");
      toast.error(res.message);
      router.push("/auth/login");
    } else {
      console.log(res.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddProduct = () => {
    setOpenAddProduct(true);
  };

  const handleEditProduct = (product: any) => {
    setEditProduct(product);
    setOpenAddProduct(true);
    setOpenMenuId(null);
  };

  const confirmDelete = async () => {
    if (!confirmDeleteId) return;

    const res = await deleteProductWithId(confirmDeleteId);

    if (res.success) {
      fetchData();
      toast.success("Product deleted successfully");
    } else {
      toast.error("Something went wrong");
    }

    setShowConfirm(false);
    setConfirmDeleteId(null);
  };

  return (
    <>
      <ProtectedRoute role="vendor">
        <div className="flex h-screen bg-gray-100 relative">
          {/* Sidebar */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          {openAddProduct && (
            <>
              <AddProduct
                onClose={() => {
                  setOpenAddProduct(false);
                  setEditProduct(null);
                }}
                editProduct={editProduct}
              />
            </>
          )}

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto mt-11 md:mt-0">
            <h2 className="text-3xl font-bold mb-6 text-black">{activeTab}</h2>

            {activeTab === "Home" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                  <div className="col-span-full min-h-[60vh] flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                  </div>
                ) : products && products.length === 0 ? (
                  /* 📭 No Products Found */
                  <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
                    <p className="text-xl font-semibold">No products found</p>
                  </div>
                ) : (
                  /* 🛍 Products List */
                  products.map((product: any) => (
                    <div
                      key={product._id}
                      className="bg-white rounded-xl shadow-md p-5 flex flex-col border border-gray-200
      hover:shadow-xl hover:-translate-y-1 transition-all duration-300
      hover:border-purple-400/60 hover:shadow-purple-200 relative"
                    >
                      {/* More menu */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(
                            openMenuId === product._id ? null : product._id
                          );
                        }}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                      >
                        <MoreVertical size={22} />
                      </button>

                      {/* Dropdown */}
                      {openMenuId === product._id && (
                        <div className="absolute top-10 right-3 bg-white shadow-lg rounded-lg border w-32 z-50 animate-fade-in">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setConfirmDeleteId(product._id);
                              setShowConfirm(true);
                              setOpenMenuId(null);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      )}

                      {/* Image */}
                      <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
                        <img
                          src={product.image.url}
                          alt={product.title}
                          className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                        />
                      </div>

                      {/* Details */}
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {product.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {product.description}
                      </p>

                      <div className="flex flex-col gap-1 text-sm">
                        <p className="font-semibold text-black">
                          Price:{" "}
                          <span className="text-purple-600">
                            ${product.price}
                          </span>
                        </p>
                        <p className="font-semibold text-black">
                          Stock:{" "}
                          <span className="text-green-600">
                            {product.stock}
                          </span>
                        </p>
                        <p className="font-semibold text-black">
                          Category:{" "}
                          <span className="text-blue-600">
                            {product.category}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === "Orders" && <OrdersDashboard />}
            {activeTab === "Order Status" && <OrderStatus />}
            {activeTab === "Inventory" && <InventoryStatus />}

            {/* Floating Add Button */}
            {activeTab === "Home" && (
              <button
                onClick={handleAddProduct}
                className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
              >
                <Plus size={24} />
              </button>
            )}
          </main>

          {showConfirm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 w-[90%] max-w-md animate-scale-in">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Are you sure?
                </h3>
                <p className="text-gray-600 mb-6">
                  Do you really want to delete this product? This action cannot
                  be undone.
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setShowConfirm(false);
                      setConfirmDeleteId(null);
                    }}
                    className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100"
                  >
                    No
                  </button>

                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </ProtectedRoute>
    </>
  );
}
