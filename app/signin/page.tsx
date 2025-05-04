"use client";

import Image from "next/image";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

// API response type
interface LoginResponse {
  email: string;
  first_name: string;
  last_name: string;
  token: string;
}

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const router = useRouter();

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    // const token = localStorage.getItem("authToken");
    // console.log(token);
    // // if (token) {
    // //   router.push("/dashboard");
    // // }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post<any>("/api/v1/login", {
        email,
        password,
      });

      const { data } = response.data;

      console.log(data.email);

      const { token } = data;

      localStorage.setItem("authToken", token);
      
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err: any) {
      setError("❌ Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#000511] px-4">
      <div className="w-full max-w-md p-8 border border-gray-700 rounded-2xl shadow-2xl bg-[#0e0f1a]">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src="/images/SCHOOL AI 1.jpg"
            alt="Magic School"
            width={180}
            height={80}
          />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-white">
          Welcome back
        </h2>
        <p className="text-sm text-center text-gray-400 mb-6">
          Sign in to your account
        </p>

        {/* Notifications */}
        {error && (
          <div className="mb-4 text-sm text-red-500 text-center">{error}</div>
        )}
        {success && (
          <div className="mb-4 text-sm text-green-500 text-center">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
              className="w-full px-4 py-2 border border-gray-600 bg-[#1c1d2a] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
              className="w-full px-4 py-2 border border-gray-600 bg-[#1c1d2a] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Legal text */}
        <p className="text-sm text-gray-500 mt-4 text-center">
          By continuing, you agree to our{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Privacy Policy
          </a>{" "}
          &{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Terms of Service
          </a>
          .
        </p>

        {/* Links */}
        <div className="flex justify-between mt-6 text-sm text-gray-400">
          <Link href="/signup" className="hover:text-white hover:underline">
            Create account
          </Link>
          <a href="#" className="hover:text-white hover:underline">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
}
