import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    setErrorMessage(""); // Clear previous errors
    try {
      const response = await axios.post("http://localhost:3000/user/login", data);
      alert("Login successful");
      localStorage.setItem("ChatApp", JSON.stringify(response.data));
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 border border-gray-700 p-8 rounded-lg shadow-lg w-96 space-y-5"
      >
        <h1 className="text-3xl font-bold text-center text-green-500">Chatter</h1>
        <h2 className="text-xl font-semibold text-center">Login</h2>

        {errorMessage && (
          <p className="text-red-500 text-center font-semibold">{errorMessage}</p>
        )}

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format",
              },
            })}
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
            {...register("password", {
              required: "Password is required",
            })}
            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
          />
          {errors.password && (
            <span className="text-red-500 text-xs font-semibold">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Submit and Signup Link */}
        <div className="flex justify-between items-center text-sm">
          <p>
            Don't have an account? <a href="#" className="text-green-400 hover:underline">Sign Up</a>
          </p>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-md font-semibold transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}