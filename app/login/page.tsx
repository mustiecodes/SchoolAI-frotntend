"use client"; // Since we have interactivity (state, onClick)

import Image from "next/image";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        {/* Logo */}
        <div className="flex justify-center">
          <Image src="/magic-school-logo.png" alt="Magic School" width={180} height={80} />
        </div>

        {/* Sign-in Heading */}
        <h2 className="text-xl font-semibold text-center mt-4">Educator Sign in</h2>

        {/* Form */}
        <form className="mt-6">
          {/* Email Field */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </button>
          </div>

          {/* Sign-in Button */}
          <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
            Sign In
          </button>
        </form>

        {/* Social Sign-in Buttons */}
        <div className="mt-4">
          <button className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100">
            <span>🔵</span> Sign in with Google
          </button>
          <button className="w-full mt-2 border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100">
            <span>🟢</span> Sign in with Microsoft
          </button>
          <button className="w-full mt-2 border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100">
            <span>✨</span> Sign in with SSO
          </button>
        </div>

        {/* Privacy Policy & Links */}
        <p className="text-center text-sm mt-4">
          By continuing, you consent to the{" "}
          <a href="#" className="text-blue-500 hover:underline">
            privacy policy
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500 hover:underline">
            terms of service.
          </a>
        </p>

        {/* Account & Password Links */}
        <div className="flex justify-between mt-4 text-sm">
          <a href="#" className="text-blue-500 hover:underline">Create an account</a>
          <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
        </div>
      </div>
    </div>
  );
}
