'use client';
import { redirectUser } from '../Utils/redirect_fn';
import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onClose, onOpenLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      console.error('Passwords do not match');
      return;
    }
    try {
      let api_url = process.env.NEXT_PUBLIC_API_URL;
      if (!api_url) {
        console.error('NEXT_PUBLIC_API_URL is not defined in .env file');
        return;
      }
      const response = await axios.post(api_url + '/register', formData);
      const { message, token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      // Handle successful registration (e.g., close modal, redirect, etc.)
      onClose();
      redirectUser(user.role); // Redirect based on user role
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration error (e.g., show error message)
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white text-gray-600 rounded-lg shadow-lg w-full max-w-md max-h-full overflow-y-auto">
        <div className="p-4 border-b relative">
          <h2 className="text-2xl font-bold">Register</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800 absolute top-0 right-0 p-4 text-xl">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
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
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
              Submit
            </button>
            <button type="button" onClick={handleReset} className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded">
              Reset
            </button>
          </div>
        </form>
        <div className="p-4 border-t">
          <p className="text-gray-700">
            Already have an account?{' '}
            <button onClick={onOpenLogin} className="text-blue-600 hover:underline">
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;