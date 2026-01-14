const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${baseUrl}api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Login failed" };
    }

    if (data?.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
    }

    return { success: true, data };
  } catch (error) {
    console.error("Login error:", error.message);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};

export const RegisterUser = async (name, email, password, role) => {
  try {
    const res = await fetch(`${baseUrl}api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Registration failed" };
    }

    if (data?.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      sessionStorage.setItem("token", data.token);
    }

    return { success: true, data };
  } catch (error) {
    console.error("Registration error:", error.message);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};

export const createProduct = async (
  title,
  description,
  price,
  category,
  stock,
  selectedFile
) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", selectedFile);
    formData.append("stock", stock);

    const token = localStorage.getItem("token");

    const res = await fetch(`${baseUrl}api/products`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllProduct = async () => {
  try {
    const res = await fetch(`${baseUrl}api/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return { success: false, message: "Failed to fetch products" };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.log("Fetch error:", error);
    return { success: false, message: "Something went wrong" };
  }
};

export const getVendorProducts = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${baseUrl}api/products/vendorProducts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 403) {
      return {
        success: false,
        blocked: true,
        message: "Your account has been blocked",
      };
    }

    if (!res.ok) {
      return { success: false, message: "Failed to fetch products" };
    }

    const data = await res.json();
    console.log(data, "api response");

    return { success: true, data };
  } catch (error) {
    console.log("Fetch error:", error);
    return { success: false, message: "Something went wrong" };
  }
};

export const getAllCategories = async () => {
  try {
    const res = await fetch(`${baseUrl}api/categories/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return { success: false, message: "Failed to fetch categories" };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.log("Fetch error:", error);
    return { success: false, message: "Something went wrong" };
  }
};

export const createOrder = async (orderData) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${baseUrl}api/order/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();
    console.log(data.error);

    if (!response.ok) {
      throw new Error(data.message || "Order create failed");
    }

    return data;
  } catch (error) {
    console.error("Order Error:", error.error);
    throw error;
  }
};

export const getVendorOrders = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${baseUrl}api/order/seller`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 403) {
      return {
        success: false,
        blocked: true,
        message: "Your account has been blocked",
      };
    }

    if (!res.ok) {
      return { success: false, message: "Failed to fetch orders" };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.log("Fetch error:", error);
    return { success: false, message: "Something went wrong" };
  }
};

export const logoutUser = async () => {
  try {
    const res = await fetch(`${baseUrl}api/auth/logout`, {
      method: "POST",
    });

    if (!res.ok) {
      return { success: false, message: "Failed to Logout" };
    }
    return { success: true };
  } catch (error) {
    console.log("error:", error);
    return { success: false, message: "Something went wrong" };
  }
};

export const deleteProductWithId = async (id) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${baseUrl}api/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to delete the product");
    }

    const data = await res.json();
    console.log("Product deleted successfully:", data);
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
};

export const updateProductWithId = async (
  id,
  title,
  description,
  price,
  category,
  stock,
  selectedFile
) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("category", category);
  formData.append("stock", stock);

  if (selectedFile) {
    formData.append("image", selectedFile);
  }

  try {
    const res = await fetch(`${baseUrl}api/products/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Failed to update the product");
    }

    console.log("Product updated successfully:", data);
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    return { success: false, message: error.message };
  }
};

export const updateOrderStatus = async (status, id) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${baseUrl}api/order/updateStatus/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      return { success: false, message: "Failed to update status" };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
};

export const getAllUsers = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${baseUrl}api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return { success: false, message: "Failed to fetch users" };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.log("Fetch error:", error);
    return { success: false, message: "Something went wrong" };
  }
};

export const getAllVendors = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${baseUrl}api/vendors`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return { success: false, message: "Failed to fetch vendors" };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.log("Fetch error:", error);
    return { success: false, message: "Something went wrong" };
  }
};

export const createCategory = async (categoryName) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${baseUrl}api/categories/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: categoryName }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Category create failed");
    }

    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

export const deleteCategoryWithId = async (id) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${baseUrl}api/categories/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to delete the category");
    }

    const data = await res.json();
    console.log("Category deleted successfully:", data);
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
};

export const updateCategoryWithId = async (id, editedCategory) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${baseUrl}api/categories/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: editedCategory }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Failed to update category",
      };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const blockUser = async (userId, status) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${baseUrl}api/blockUser/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }), // 👈 yahan status send ho raha hai
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Something went wrong");
      return;
    }

    return data;
  } catch (error) {
    console.log("Error:", error.message);
  }
};

export const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${baseUrl}api/users/deleteUser/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Something went wrong");
      return;
    }

    return data;
  } catch (error) {
    console.log("Error:", error.message);
  }
};

export const getAllOrders = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${baseUrl}api/order/allOrders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 403) {
      return {
        success: false,
        blocked: true,
        message: "Your account has been blocked",
      };
    }

    if (!res.ok) {
      return { success: false, message: "Failed to fetch orders" };
    }

    const data = await res.json();
    return { success: true, data }; // ✅ yahan ab success milega
  } catch (error) {
    console.log("Fetch error:", error);
    return { success: false, message: "Something went wrong" };
  }
};

export const getUserOrders = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${baseUrl}api/order/getCurrentUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 403) {
      return {
        success: false,
        blocked: true,
        message: "Your account has been blocked",
      };
    }

    if (!res.ok) {
      return { success: false, message: "Failed to fetch orders" };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.log("Fetch error:", error);
    return { success: false, message: "Something went wrong" };
  }
};
