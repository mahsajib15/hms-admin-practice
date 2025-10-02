"use client";

import React, { useState } from "react";
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
} from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function AuthMenuBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <aside className="w-56 min-h-screen bg-white shadow-xl p-3">
      <div className="relative">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 cursor-pointer flex items-center border rounded-lg p-3"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <FaBuilding className="text-lg" />
          <span>Organization</span>
        </Button>

        {dropdownOpen && (
          <div className="absolute left-0 top-full mt-1 w-full bg-white border rounded-md shadow-lg z-50">
            <button className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-300 cursor-pointer">
              <FaBuilding /> <span>Organization</span>
            </button>
            <button className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-300 cursor-pointer">
              <FaClipboardList /> Diagnostic
            </button>
            <button className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-300 cursor-pointer">
              <FaStore /> Store
            </button>
            <button className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-300 cursor-pointer">
              <FaUtensils /> Restaurant
            </button>
            <button className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-300 cursor-pointer">
              <FaFish /> Fish Market
            </button>
          </div>
        )}
      </div>

      {/* Main Menu */}
      <nav className="mt-3 flex flex-col gap-1">
        <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100">
          <FaUsers /> Users
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100">
          <FaUserShield /> Roles
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100">
          <FaClipboardList /> Activity Log
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100">
          <FaUser /> Profile
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100">
          <FaCog /> Settings
        </button>
      </nav>
    </aside>
  );
}
