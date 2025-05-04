"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";


export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const { email, password, confirmPassword, firstName, lastName } = form;

    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post<any>("/api/v1/register", {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      });

      const { token } = response.data;

      localStorage.setItem("authToken", token);

      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
      toast.success("Account created successfully!");

      setForm({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
      });
    } catch (err: any) {
      console.error("Signup error:", err); // For debugging

      const message = err?.response?.data?.error || "Signup failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#000511] px-4">
      <div className="w-full max-w-md p-8 border rounded-lg shadow-lg">
        <div className="flex justify-center">
          <Image
            src="/images/SCHOOL AI 1.jpg"
            alt="Magic School"
            width={180}
            height={80}
          />
        </div>

        <h2 className="text-xl font-semibold text-center text-white mt-4">
          Sign Up
        </h2>

        <form onSubmit={handleSignup} className="mt-6 space-y-4">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 text-white border rounded-lg focus:ring-2 focus:ring-purple-500 bg-transparent"
            required
          />

          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 text-white border rounded-lg focus:ring-2 focus:ring-purple-500 bg-transparent"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 text-white border rounded-lg focus:ring-2 focus:ring-purple-500 bg-transparent"
            required
          />

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-white bg-transparent"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="relative">
            <input
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-white bg-transparent"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-left text-sm mt-4 text-white">
          By continuing, you consent to the{" "}
          <a href="#" className="text-blue-500 hover:underline">
            privacy policy
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500 hover:underline">
            terms of service
          </a>
          .
        </p>

        <div className="flex justify-between mt-4 text-sm text-white">
          <span>Already have an account?</span>
          <Link href="/signin" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
