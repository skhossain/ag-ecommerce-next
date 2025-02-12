'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { redirectUser } from '../Utils/redirect_fn';

const Login = ({ onClose, onOpenRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let api_url = process.env.NEXT_PUBLIC_API_URL;
      let url = api_url;
      if (!api_url) {
          console.error('NEXT_PUBLIC_API_URL is not defined in .env file');
          return undefined;
      }
      if (api_url.includes('/api')) {
        url = api_url.replace('/api', ''); // Remove '/api' if it exists
      }
      axios.get(url+'/sanctum/csrf-cookie').then(response => {
      axios.post(api_url+'/login', formData,{
        withCredentials: true 
      }).then(response => {
        const {message, token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        // Handle successful login (e.g., close modal, redirect, etc.)
        onClose();
        redirectUser(user.role); // Redirect based on user role
      });
    });
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error (e.g., show error message)
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white text-gray-800 rounded-lg shadow-lg w-full max-w-md max-h-full overflow-y-auto">
        <div className="p-4 border-b relative">
          <h2 className="text-2xl font-bold">Login</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800 absolute top-0 right-0 p-4 text-xl">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
              Login
            </button>
          </div>
        </form>
        <div className="p-4 border-t">
          <p className="text-gray-700">
            Don't have an account?{' '}
            <button onClick={onOpenRegister} className="text-blue-600 hover:underline">
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;