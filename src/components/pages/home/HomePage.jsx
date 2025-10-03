"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  FaUserShield,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaIndustry,
  FaBuilding,
  FaUsers,
} from "react-icons/fa";

export default function Home() {
  return (
    <div className="p-6 space-y-6">
      {/* Top Banner */}
      <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow p-8 flex flex-col items-center text-center">
        {/* Logo */}
        <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center mb-4">
          <span className="text-3xl text-white font-bold">M</span>
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-2xl font-bold">Bangladeshi Traditional Food</h1>
        <p className="text-gray-600 mt-2">
          Welcome to your professional dashboard. Manage your business with
          confidence and efficiency.
        </p>

        {/* Owner Badge */}
        <span className="mt-3 px-3 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded-md flex items-center gap-1">
          <FaUserShield className="text-xs" /> OWNER
        </span>

        {/* Buttons */}
        <div className="mt-5 flex gap-3">
          <Button className="bg-green-600 hover:bg-green-700">Get Started</Button>
          <Button variant="outline" className="flex gap-2 items-center">
            <FaUsers /> View Users
          </Button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Organization Details */}
        <div className="rounded-xl border bg-white shadow p-4">
          <div className="mb-3 border-b pb-2">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <FaBuilding /> Organization Details
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-md">
                <FaBuilding className="text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">ORGANIZATION NAME</p>
                <p className="font-medium">Bangladeshi Traditional Food</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-md">
                <FaCalendarAlt className="text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">ESTABLISHED</p>
                <p className="font-medium">N/A</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-md">
                <FaIndustry className="text-yellow-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">INDUSTRY</p>
                <p className="font-medium">N/A</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-100 rounded-md">
                <FaGlobe className="text-teal-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">WEBSITE</p>
                <p className="font-medium">N/A</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="rounded-xl border bg-white shadow p-4">
          <div className="mb-3 border-b pb-2">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <FaPhone /> Contact Information
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-md">
                <FaPhone className="text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">PRIMARY CONTACT</p>
                <p className="font-medium">01400334422</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-md">
                <FaPhone className="text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">ALTERNATIVE CONTACT</p>
                <p className="font-medium">01998888777</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-md">
                <FaEnvelope className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">EMAIL ADDRESS</p>
                <p className="font-medium">N/A</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-md">
                <FaMapMarkerAlt className="text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">ADDRESS</p>
                <p className="font-medium">
                  H#20/A, Indira Road, Sher-E-Bangla Nagar, Dhaka-1215, Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
