'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData?.role !== 'user') {
        router.push('/'); 
      } else {
        setUser(userData);
      }
    }

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const getHeaders = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        };
        const response = await axios.get(`${apiUrl}/user/orders`, getHeaders);
      
        setOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [router, apiUrl]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* User Information */}
        <div className="bg-white text-gray-700 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">User Information</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        
        {/* Recent Orders */}
        <div className="bg-white text-gray-700 p-4 rounded-lg shadow-md md:col-span-2">
          <h2 className="text-2xl font-bold mb-2">Recent Orders</h2>
          {orders.length > 0 ? (
            <ul>
              {orders.map((order) => (
                <li key={order.id} className="border-b py-2">
                  <div className='flex justify-between'>
                    <div>
                  <span>Order #{order.id} - {order.total_amount} TK</span>
                  <div className="text-sm text-gray-500">Status: {order.status}</div>
                  </div>
                  <div>
                    <table>
                      <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th className='px-1'>Price</th>
                      </tr>
                      {order.items.map((item) => (
                        <tr key={item.id}>
                          <td>{item.product.name}</td>
                          <td className='text-center'>{item.quantity}</td>
                          <td className='text-end'>{item.price} TK</td>
                        </tr>
                      ))}
                    </table>
                  </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      </div>
      
      {/* Account Settings */}
      <div className="bg-white text-gray-700 p-4 rounded-lg shadow-md mt-4">
        <h2 className="text-2xl font-bold mb-2">Account Settings</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
