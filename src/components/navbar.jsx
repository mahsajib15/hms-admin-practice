"use client"

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/components/pages/store/authStore";
import { useRouter } from "next/navigation";
import Clock from "@/components/ui/clock";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode

export default function Navbar() {
  const { isAuthenticated, logout, accessToken } = useAuthStore(); // Get accessToken from store
  const router = useRouter();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [userData, setUserData] = useState({ name: null, email: null }); // State to store user data
  

  const themeModalRef = useRef(null);
  const themeButtonRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const profileButtonRef = useRef(null);


  useEffect(() => {
    function handleClickOutside(event) {

      if (
        showThemeModal &&
        themeModalRef.current && 
        !themeModalRef.current.contains(event.target) &&
        themeButtonRef.current &&
        !themeButtonRef.current.contains(event.target)
      ) {
        setShowThemeModal(false);
      }
      
      // Close profile dropdown if click is outside
      if (
        showProfileDropdown &&
        profileDropdownRef.current && 
        !profileDropdownRef.current.contains(event.target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setShowProfileDropdown(false);
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    
    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showThemeModal, showProfileDropdown]);

  // Decode access token to get user email and name
  useEffect(() => {
    if (accessToken) {
      try {
        console.log("Access Token before decoding:", accessToken); // Added for debugging
        const decodedToken = jwtDecode(accessToken);
        setUserData({ 
          name: decodedToken.name || 'User',
          email: decodedToken.email || 'N/A'
        }); // Assuming 'name' and 'email' are fields in your token
      } catch (error) {
        console.error("Error decoding token:", error);
        setUserData({ name: null, email: null });
      }
    } else {
      setUserData({ name: null, email: null });
    }
  }, [accessToken]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleThemeChange = (theme) => {
    console.log("Theme changed to:", theme);
    setShowThemeModal(false);
  };

  return (
    <nav className="top-0 left-0 right-0 z-50 flex justify-between items-center px-4 shadow-lg py-2 ">
      <div className="text-lg font-bold">
        <Link href="/">HMS-Admin Next</Link>
      </div>
      <Clock />
      <ul className="flex space-x-4 items-center">
        <li className="relative">
          <div
            ref={themeButtonRef}
            className="cursor-pointer text-2xl"
            onClick={() => setShowThemeModal(!showThemeModal)}
          >
            <MdOutlineWbSunny />
          </div>
          {showThemeModal && (
            <div 
              ref={themeModalRef}
              className="absolute right-0 mt-2 w-32 bg-gray-800 rounded-md shadow-lg py-1 z-10"
            >
              <button
                onClick={() => handleThemeChange("light")}
                className="block w-full text-left px-4 py-2 text-sm cursor-pointer text-white hover:bg-gray-700"
              >
                Light
              </button>
              <button
                onClick={() => handleThemeChange("dark")}
                className="block w-full text-left px-4 py-2 cursor-pointer text-sm text-white hover:bg-gray-700"
              >
                Dark
              </button>
              <button
                onClick={() => handleThemeChange("system")}
                className="block w-full text-left cursor-pointer text-white px-4 py-2 text-sm hover:bg-gray-700"
              >
                System
              </button>
            </div>
          )}
        </li>
        {isAuthenticated ? (
          <li className="relative">
            <div
              ref={profileButtonRef}
              className="flex items-center cursor-pointer"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <FaUserCircle className="h-8 w-8" />
            </div>
            {showProfileDropdown && (
              <div 
                ref={profileDropdownRef}
                className="absolute right-0 mt-2 w-48 text-white bg-gray-800 rounded-md shadow-lg py-1 z-10"
              >
                <div className="px-4 py-2 text-sm border-b border-gray-700">
                  <p>{userData.name || 'Loading...'}</p>
                  <p className="text-white">{userData.email || 'Loading...'}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center cursor-pointer w-full px-4 py-2 text-sm hover:bg-gray-700"
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
