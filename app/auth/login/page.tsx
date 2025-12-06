"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {loginUser} from '../../../libs/api'
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const router = useRouter();

  const handleLogin = async(e: any) => {
    e.preventDefault();
    console.log(form);
    // loginUser(form.email , form.password);
      const res = await loginUser(form.email, form.password);

    if (res.success) {
      alert("Logged in sucessfully!")
      router.push("/");
    } else {
      alert(res.message || "Invalid credentials ❌");

    }
    
  };

  return (
   <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Login Account
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">
         

          {/* Email */}
          <div>
            <label className="text-gray-700 text-sm font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="example@email.com"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-gray-100 text-gray-900 placeholder-gray-400 outline-none border border-gray-300 
              focus:border-indigo-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-700 text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Enter password"
                className="w-full mt-1 px-4 py-3 pr-12 rounded-xl bg-gray-100 text-gray-900 placeholder-gray-400 outline-none border border-gray-300 
                focus:border-indigo-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

        

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-xl bg-indigo-600 text-white font-semibold 
            hover:bg-indigo-700 transition shadow-md"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
         Don't have an account?{" "}
          <a href="/auth/register" className="text-indigo-600 font-medium hover:underline">
            Register
          </a>
        </p>
      </div>
    </main>
  );
}
