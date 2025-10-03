"use client";

import React from "react";
import Navbar from "../navbar";
import AuthSideBar from "./AuthSideBar";
import { usePathname } from "next/navigation";

export default function MainLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col" suppressHydrationWarning={true}>
      {!pathname?.includes("/login") && <Navbar />}
      <div className="flex flex-1">
        {!pathname?.includes("/login") && <AuthSideBar />}
        <main className={`flex-grow ${!pathname?.includes("/login") ? "pl-56" : "w-full"}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
