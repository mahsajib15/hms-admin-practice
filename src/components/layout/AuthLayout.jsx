import React from 'react';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-gray-800 text-white p-4">
        <h1>Header</h1>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Section */}
        <aside className="w-64 bg-gray-900 text-white p-4">
          <h2>Sidebar</h2>
          <ul>
            <li>Link 1</li>
            <li>Link 2</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}