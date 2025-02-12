'use client';
import React, { useEffect } from 'react';



export default function Dashboard() {
   return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {/* Example card */}
        <div className="bg-white text-gray-600 shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">Total Sales</h2>
          <p className="text-gray-600">$10,000</p>
        </div>
        <div className="bg-white text-gray-600 shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">Total Orders</h2>
          <p className="text-gray-600">150</p>
        </div>
        <div className="bg-white text-gray-600 shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">Total Customers</h2>
          <p className="text-gray-600">200</p>
        </div>
        <div className="bg-white text-gray-600 shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">Total Products</h2>
          <p className="text-gray-600">50</p>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-8">Recent Orders</h1>
      <div className="bg-white text-gray-600 shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">Customer</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Total</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Example row */}
            <tr>
              <td className="py-2 px-4 border-b">#12345</td>
              <td className="py-2 px-4 border-b">John Doe</td>
              <td className="py-2 px-4 border-b">2025-02-10</td>
              <td className="py-2 px-4 border-b">$100.00</td>
              <td className="py-2 px-4 border-b">Shipped</td>
            </tr>
            {/* Repeat for other orders */}
          </tbody>
        </table>
      </div>
    </div>
  );
}