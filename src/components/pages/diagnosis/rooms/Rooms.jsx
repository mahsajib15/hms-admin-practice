"use client";

import CustomButton from "@/components/ui/CustomButton";
import React from "react";
import { useRooms } from "@/hooks/useRooms";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function RoomList() {
  const { rooms, isLoading, error, fetchRooms } = useRooms();

  const handleDelete = (roomId) => {
    if (!confirm("Are you sure you want to delete this room?")) return;
    alert("Room deleted successfully!");
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Rooms ({rooms.length})</h1>
        <div className="flex gap-2">
          <CustomButton 
            title="Refresh" 
            onClick={fetchRooms} 
            className="bg-blue-500 hover:bg-blue-600"
          />
          <CustomButton 
            title="Add Room" 
            onClick={() => alert("Add Room clicked")} 
          />
        </div>
      </div>
      
      {isLoading ? (
        <div className="p-5 text-center">Loading rooms...</div>
      ) : error ? (
        <div className="p-5 text-center text-red-500">
          <p>Error: {error}</p>
          <CustomButton 
            title="Try Again" 
            onClick={fetchRooms} 
            className="mt-2 bg-blue-500 hover:bg-blue-600"
          />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-center">Status</th>
                <th className="px-4 py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {rooms && rooms.length > 0 ? (
                rooms.map((room) => (
                  <tr key={room.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 text-left">{room.name}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-3 py-1 rounded text-sm ${
                          room.status === "active"
                            ? "bg-green-100 border border-green-500 text-green-800"
                            : "bg-red-100 border border-red-500 text-red-800"
                        }`}
                      >
                        {room.status || 'N/A'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end space-x-2">
                        {/* <CustomButton 
                          title="Edit" 
                          onClick={() => alert(`Edit ${room.name}`)}
                          className="bg-blue-500 hover:bg-blue-600"
                        /> */}
                        <FaEdit className="text-green-600 text-2xl border rounded p-1" />
                        {/* <CustomButton
                          title="Delete"
                          className="bg-red-500 hover:bg-red-600"
                          onClick={() => handleDelete(room.id)}
                        /> */}
                        <FaTrash className="text-red-600 text-2xl border rounded p-1" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="h-24 text-center">
                    No rooms found. Click refresh to try again.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
