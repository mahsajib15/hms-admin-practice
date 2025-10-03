"use client"

export default function CustomButton({ title, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`p-5 bg-blue-600 font-bold text-white py-3 cursor-pointer hover:bg-linear-30 from-blue-600 to-blue-800 rounded-xl transition ${className}`}
    >
      {title}
    </button>
  );
}
