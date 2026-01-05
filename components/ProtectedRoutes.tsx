"use client";

import { useEffect, useState } from "react";
import { checkAuth } from "@/utils/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children, role }: any) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const authUser = checkAuth();

    if (!authUser) {
      router.push("/auth/login");
      return;
    }

    if (role && authUser.role !== role) {
      toast.error(`Only ${role} can access this route!`);
      router.push("/");
      return;
    }

    setUser(authUser);
  }, [router, role]);

  if (!mounted) return null;

  if (!user) return null;

  return children;
};

export default ProtectedRoute;
