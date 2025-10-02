'use client';

import React from "react";
import Navbar from "../navbar";
import AuthSideBar from "./AuthSideBar";
import { usePathname } from "next/navigation";

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <div className="min-h-screen flex flex-col">
      {!isLoginPage && <Navbar />}
      <div className={`flex flex-1 ${!isLoginPage ? "pt-16" : ""}`}>
        {!isLoginPage && <AuthSideBar />}
        <main className={`flex-grow p-4 ${isLoginPage ? "w-full" : ""}`}>{children}</main>
      </div>
    </div>
  );
}
