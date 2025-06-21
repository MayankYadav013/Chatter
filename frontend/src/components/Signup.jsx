import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const [authUser, setAuthUser] = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/user/signup", {
        fullname: data.fullname,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      if (response.data) {
        toast.success("Signup successful");
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-900 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-slate-800 text-white px-8 py-6 rounded-xl w-full max-w-md space-y-5 shadow-lg"
      >
        <h1 className="text-3xl text-center font-bold">
          Chat<span className="text-green-500">App</span>
        </h1>
        <h2 className="text-xl text-center font-semibold">Signup</h2>

        {/* Fullname */}
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 outline-none focus:ring-2 focus:ring-green-500"
            placeholder="John Doe"
            {...register("fullname", { required: true })}
          />
          {errors.fullname && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 outline-none focus:ring-2 focus:ring-green-500"
            placeholder="you@example.com"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Re-enter your password"
            {...register("confirmPassword", {
              required: "This field is required",
              validate: validatePasswordMatch,
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center text-sm">
          <p>
            Have an account?
            <Link
              to="/login"
              className="text-blue-400 hover:underline ml-1 font-medium"
            >
              Login
            </Link>
          </p>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
