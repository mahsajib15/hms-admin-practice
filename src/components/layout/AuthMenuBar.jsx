"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  FaUsers,
  FaUserShield,
  FaUser,
  FaCog,
  FaClipboardList,
  FaBuilding,
  FaStore,
  FaUtensils,
  FaFish,
  FaChevronDown,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function AuthMenuBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <aside className="w-56 min-h-screen bg-white shadow-xl p-3">
      <div className="relative" ref={dropdownRef}>
        <Button
          variant="outline"
          className="w-full flex justify-between items-center border rounded-lg p-3 cursor-pointer"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <div className="flex items-center gap-2">
            <FaBuilding className="text-lg" />
            <span>Organization</span>
          </div>
          <FaChevronDown
            className={`transition-transform duration-200 ${
              dropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </Button>

        <div
          className={`absolute left-0 top-full mt-1 w-full bg-white border rounded-md shadow-lg z-50 transform transition-all duration-200 ease-out
          ${
            dropdownOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }`}
        >
          <Link
            href="/organization"
            className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <FaBuilding /> <span>Organization</span>
          </Link>
          <Link
            href="/diagnostic"
            className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <FaClipboardList /> Diagnostic
          </Link>
          <Link
            href="/store"
            className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <FaStore /> Store
          </Link>
          <Link
            href="/restaurant"
            className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <FaUtensils /> Restaurant
          </Link>
          <Link
            href="/fish-market"
            className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <FaFish /> Fish Market
          </Link>
        </div>
      </div>

      <nav className="mt-3 flex flex-col gap-1">
        <Link
          href="/users"
          className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
        >
          <FaUsers /> Users
        </Link>
        <Link
          href="/roles"
          className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
        >
          <FaUserShield /> Roles
        </Link>
        <Link
          href="/activity-log"
          className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
        >
          <FaClipboardList /> Activity Log
        </Link>
        <Link
          href="/profile"
          className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
        >
          <FaUser /> Profile
        </Link>
        <Link
          href="/settings"
          className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
        >
          <FaCog /> Settings
        </Link>
      </nav>
    </aside>
  );
}
