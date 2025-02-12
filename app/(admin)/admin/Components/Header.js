'use client';
import React,{useEffect,useState} from 'react';
import axios from 'axios';

const Header = () => {
const [token, setToken] = useState(null);

useEffect(() => { 
  setToken(localStorage.getItem('token'));
}, []);

  const handleLogout = async () => {
    try {
      let api_url = process.env.NEXT_PUBLIC_API_URL;

      const getHeaders = {
        headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
        },
        withCredentials: true
      }; 

      if (!api_url) {
        console.error('NEXT_PUBLIC_API_URL is not defined in .env file');
        return;
      }
  
      await axios.post(api_url + '/logout', {}, getHeaders);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <a href="/admin/dashboard">Admin Dashboard</a>
        </div>
        <div className="flex items-center space-x-4">
          <a href="/admin/profile" className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A9 9 0 1118.879 6.196M12 7v4l3 3"></path>
            </svg>
          </a>
          <button onClick={handleLogout} className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5m0 6H3"></path>
            </svg>
          </button>
        </div>
        <button className="md:hidden text-gray-400 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;