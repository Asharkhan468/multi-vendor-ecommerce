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
      sessionStorage.setItem("token", data.token);
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

    const res = await fetch(`${baseUrl}api/products`, {
      method: "POST",
      body: formData, 
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
