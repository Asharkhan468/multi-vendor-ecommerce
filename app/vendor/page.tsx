"use client";

import InventoryStatus from "@/components/InventoryVendor";
import OrdersDashboard from "@/components/OrderPageVendor";
import OrderStatus from "@/components/OrderStatusVendor";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { MoreVertical, Plus } from "lucide-react";
import AddProduct from "@/components/AddProduct";
import { getAllProduct } from "@/libs/api";

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState("Home");
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(products);
  useEffect(() => {
    const closeMenu = () => setOpenMenuId(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getAllProduct();

      if (res.success) {
        setProducts(res.data.products);
        setLoading(false);
      } else {
        console.log(res.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddProduct = () => {
    setOpenAddProduct(true);
  };

  const handleEditProduct = (id: number) => {
    //edit function
  };

  const handleDeleteProduct = (id: number) => {
    //delete function
  };

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      {openAddProduct && (
        <>
          <AddProduct onClose={() => setOpenAddProduct(false)} />
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
                        onClick={() => handleEditProduct(product._id)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
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
                      <span className="text-purple-600">${product.price}</span>
                    </p>
                    <p className="font-semibold text-black">
                      Stock:{" "}
                      <span className="text-green-600">{product.stock}</span>
                    </p>
                    <p className="font-semibold text-black">
                      Category:{" "}
                      <span className="text-blue-600">{product.category}</span>
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
    </div>
  );
}
