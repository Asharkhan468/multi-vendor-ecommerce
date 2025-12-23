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
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${baseUrl}api/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
