"use client"

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/pages/store/authStore";
import { useRouter } from "next/navigation";
import Clock from "@/components/ui/clock";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleThemeChange = (theme) => {
    console.log("Theme changed to:", theme);
    setShowThemeModal(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex px-4 shadow-lg py-2 justify-between items-center">
      <div className="text-lg font-bold">
        <Link href="/">HMS-Admin Next</Link>
      </div>
      <Clock />
      <ul className="flex space-x-4 items-center">
        <li className="relative">
          <div
            className="cursor-pointer text-2xl"
            onClick={() => setShowThemeModal(!showThemeModal)}
          >
            <MdOutlineWbSunny />
          </div>
          {showThemeModal && (
            <div className="absolute right-0 mt-2 w-32 bg-gray-800 rounded-md shadow-lg py-1 z-10">
              <button
                onClick={() => handleThemeChange("light")}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
              >
                Light
              </button>
              <button
                onClick={() => handleThemeChange("dark")}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
              >
                Dark
              </button>
              <button
                onClick={() => handleThemeChange("system")}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
              >
                System
              </button>
            </div>
          )}
        </li>
        {isAuthenticated ? (
          <li className="relative">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <FaUserCircle className="h-8 w-8" />
            </div>
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10">
                <div className="px-4 py-2 text-sm border-b border-gray-700">
                  <p>User Name</p>
                  <p className="text-gray-400">user@example.com</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-700"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </li>
        ) : (
          <li>
            <Link href="/login">
              <Button variant="ghost" className="text-white cursor-pointer">
                Login
              </Button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
