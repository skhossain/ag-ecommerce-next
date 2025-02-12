'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openLogin, closeLogin, openRegister, closeRegister, openCart, closeCart } from '../../../features/modal/modalSlice';
import Register from './Register';
import Login from './Login';
import Cart from './Cart';
import axios from 'axios';
import Link from 'next/link';

const Header = () => {
  const dispatch = useDispatch();
  const { isLoginOpen, isRegisterOpen, isCartOpen } = useSelector((state) => state.modal);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (token) {
      setToken(token);
      setUser(user);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    try {
      let api_url = process.env.NEXT_PUBLIC_API_URL;
      if (!api_url) {
        console.error('NEXT_PUBLIC_API_URL is not defined in .env file');
        return;
      }
      axios.post(api_url + '/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }).then(() => {;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      window.location.href = '/';
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">
          <Link href="/">E-Commerce</Link>
        </div>
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="text-gray-600 hover:text-gray-800">Home</Link>
          <Link href="/shop" className="text-gray-600 hover:text-gray-800">Shop</Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-800">About</Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-800">Contact</Link>
        </nav>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className='flex items-center space-x-4'>
            <button onClick={handleLogout} className="text-gray-400 hover:text-gray-800">
              Logout
            </button>
            {user && user.role === 'admin' && (
              <Link href={`/admin`} className="text-gray-400 hover:text-gray-800">
                Dashboard
              </Link>
            )}
            {user && user.role === 'user' && (
              <Link  href={`/dashboard`} className="text-gray-400 hover:text-gray-800">
                Dashboard
              </Link>
            )}
            
            </div>
          ) : (
            <>
              <button onClick={() => dispatch(openRegister())} className="text-gray-400 hover:text-gray-800">
                Register
              </button>
              <button onClick={() => dispatch(openLogin())} className="text-gray-400 hover:text-gray-800">
                Login
              </button>
            </>
          )}
          <button onClick={() => dispatch(openCart())} className="text-gray-400 hover:text-gray-800">
            Cart
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="text-gray-600 hover:text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 5M17 13l1.4 5M9 21h6M9 21a2 2 0 11-4 0M15 21a2 2 0 11-4 0"></path>
            </svg>
          </Link>
          <Link href="/account" className="text-gray-600 hover:text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A9 9 0 1118.879 6.196M12 7v4l3 3"></path>
            </svg>
          </Link>
        </div>
        <button className="md:hidden text-gray-600 hover:text-gray-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {isRegisterOpen && <Register onClose={() => dispatch(closeRegister())} onOpenLogin={() => dispatch(openLogin())} />}
      {isLoginOpen && <Login onClose={() => dispatch(closeLogin())} onOpenRegister={() => dispatch(openRegister())} />}
      {isCartOpen && <Cart onClose={() => dispatch(closeCart())} />}
    </header>
  );
};

export default Header;