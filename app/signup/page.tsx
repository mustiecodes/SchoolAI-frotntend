"use client"; // Since we have interactivity (state, onClick)

import Image from "next/image";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#000511]">
      <div className="w-full max-w-md p-8 border-[1px] rounded-lg shadow-lg">
        {/* Logo */}
        <div className="flex justify-center">
          <Image src="/images/SCHOOL AI 1.jpg" alt="Magic School" width={180} height={80} />
        </div>

        {/* Sign-in Heading */}
        <h2 className="text-xl font-semibold text-center text-white mt-4">Sign Up</h2>

        {/* Form */}
        <form className="mt-6">
          {/* Email Field */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-2 text-white border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </button>
          </div>

           {/* Confirm Password Field */}
           <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
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
            Sign Up
          </button>
        </form>

        {/* Social Sign-in Buttons */}
        {/* <div className="mt-4">
          <button className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100">
            <span>🔵</span> Sign in with Google
          </button>
          <button className="w-full mt-2 border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100">
            <span>🟢</span> Sign in with Microsoft
          </button>
          <button className="w-full mt-2 border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100">
            <span>✨</span> Sign in with SSO
          </button>
        </div> */}

        {/* Privacy Policy & Links */}
        <p className="text-left text-sm mt-4">
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
        <span className="text-white">Already have an account?</span>
          <span className="text-blue-500 hover:underline">
            <Link href={"/signin"}>Sign In</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
