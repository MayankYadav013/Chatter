import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../src/context/AuthProvider";
import { Link } from "react-router-dom";

export default function Signup() {
  const[authUser, setAuthUser]=useAuth()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Watch password and confirm password fields
  const password = watch("password", "");

  const validatePasswordMatch = (value) => {
    return value === password || "Passwords don't match";
  };

  const onSubmit =async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    // Clear previous errors
    await axios
      .post("/api/user/signup", userInfo)
      .then((response) => {
        // console.log(response.data);
        if(response.data){
            alert("Signup successful");
        }
        localStorage.setItem("ChatApp",JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if(error.response){
          alert("Error:"+error.response.data.error)
        }
      });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 border border-gray-700 p-8 rounded-lg shadow-lg w-96 space-y-5"
      >
        <h1 className="text-3xl font-bold text-center text-green-500">Chatter</h1>
        <h2 className="text-xl font-semibold text-center">Sign Up</h2>

        {/* Full Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            {...register("fullname", { required: "Full name is required" })}
            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
          />
          {errors.fullname && (
            <span className="text-red-500 text-xs font-semibold">
              {errors.fullname.message}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
          />
          {errors.email && (
            <span className="text-red-500 text-xs font-semibold">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
          />
          {errors.password && (
            <span className="text-red-500 text-xs font-semibold">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter your password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: validatePasswordMatch,
            })}
            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-xs font-semibold">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        {/* Submit and Login Link */}
        <div className="flex justify-between items-center text-sm">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-green-400 hover:underline">
              Login
            </Link>
          </p>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-md font-semibold transition"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
