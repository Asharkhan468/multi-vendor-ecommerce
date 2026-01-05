export const checkAuth = () => {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); 

  if (!token || !user) return null;

  return user; 
};
