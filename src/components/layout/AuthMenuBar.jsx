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
  FaCalendarAlt,
  FaSearch,
  FaBed,
  FaUserMd,
  FaVials,
  FaFileAlt,
  FaChartBar,
  FaMoneyBill,
  FaFlask,
  FaUniversity,
  FaDoorClosed,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function AuthMenuBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("diagnostic"); // default
  const [openAnalytics, setOpenAnalytics] = useState(false); // NEW state for Analytics
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

  // Define submenus
  const subMenus = {
    diagnostic: [
      { href: "/diagnostic/dashboard", label: "Dashboard", icon: FaClipboardList },
      { href: "/diagnostic/appointments", label: "Appointments", icon: FaCalendarAlt },
      { href: "/diagnostic/checkups", label: "Checkups", icon: FaSearch },
      { href: "/diagnostic/patients", label: "Patients", icon: FaBed },
      { href: "/diagnostic/doctors", label: "Doctors", icon: FaUserMd },
      { href: "/diagnostic/tests", label: "Tests", icon: FaVials },
      { href: "/diagnostic/reports", label: "Reports", icon: FaFileAlt },
      {
        label: "Analytics",
        icon: FaChartBar,
        children: [
          { href: "/diagnostic/analytics/statistics", label: "Statistics", icon: FaChartBar },
          { href: "/diagnostic/analytics/daily-sales", label: "Daily Sales", icon: FaClipboardList },
        ],
      },
      { href: "/diagnostic/expenses", label: "Expenses", icon: FaMoneyBill },
      { href: "/diagnostic/reagents", label: "Reagents", icon: FaFlask },
      { href: "/diagnostic/departments", label: "Departments", icon: FaUniversity },
      { href: "/diagnostics/rooms", label: "Rooms", icon: FaDoorClosed },
    ],
    store: [
      { href: "/store/dashboard", label: "Dashboard", icon: FaStore },
      { href: "/store/products", label: "Products", icon: FaClipboardList },
    ],
    restaurant: [
      { href: "/restaurant/dashboard", label: "Dashboard", icon: FaUtensils },
      { href: "/restaurant/menu", label: "Menu", icon: FaClipboardList },
    ],
    fishMarket: [
      { href: "/fish-market/dashboard", label: "Dashboard", icon: FaFish },
      { href: "/fish-market/orders", label: "Orders", icon: FaClipboardList },
    ],
  };

  return (
    <aside className="w-56 min-h-screen bg-white text-sm shadow-xl p-3">
      {/* Top Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <Button
          variant="outline"
          className="w-full flex justify-between items-center border rounded-lg p-3 cursor-pointer"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <div className="flex items-center gap-2">
            <FaBuilding className="text-lg" />
            <span className="capitalize">{activeMenu}</span>
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
          <div
            onClick={() => {
              setActiveMenu("organization");
              setDropdownOpen(false);
            }}
            className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <FaBuilding /> Organization
          </div>
          <div
            onClick={() => {
              setActiveMenu("diagnostic");
              setDropdownOpen(false);
            }}
            className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <FaClipboardList /> Diagnostic
          </div>
          <div
            onClick={() => {
              setActiveMenu("store");
              setDropdownOpen(false);
            }}
            className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <FaStore /> Store
          </div>
          <div
            onClick={() => {
              setActiveMenu("restaurant");
              setDropdownOpen(false);
            }}
            className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <FaUtensils /> Restaurant
          </div>
          <div
            onClick={() => {
              setActiveMenu("fishMarket");
              setDropdownOpen(false);
            }}
            className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <FaFish /> Fish Market
          </div>
        </div>
      </div>

      {/* Submenu Rendering */}
      <nav className="mt-3 flex flex-col gap-1">
        {subMenus[activeMenu]?.map((item, idx) =>
          item.children ? (
            <div key={idx}>
              {/* Analytics Header with Toggle Arrow */}
              <div
                onClick={() => setOpenAnalytics((prev) => !prev)}
                className="flex justify-between items-center px-3 py-2 cursor-pointer rounded hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  <item.icon /> {item.label}
                </div>
                <FaChevronDown
                  className={`transition-transform duration-200 ${
                    openAnalytics ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>

              {/* Analytics Submenus */}
              <div
                className={`ml-5 transition-all duration-200 ${
                  openAnalytics ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                {item.children.map((child, cidx) => (
                  <Link
                    key={cidx}
                    href={child.href}
                    className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
                  >
                    <child.icon /> {child.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link
              key={idx}
              href={item.href}
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
            >
              <item.icon /> {item.label}
            </Link>
          )
        )}
      </nav>
    </aside>
  );
}
