"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      setIsAuthenticated(!!token);
    };
  
    checkAuth(); // Run once on mount
  
    // Listen for custom authChange events (same tab)
    window.addEventListener('authChange', checkAuth);
  
    return () => {
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    router.push("/signin");
  };

  return (
    <nav className="w-full flex justify-end items-center px-6 py-4 border-b shadow-sm">
      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      ) : (
        <div className="space-x-4">
          <button
            onClick={() => router.push("/signin")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Sign In
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
