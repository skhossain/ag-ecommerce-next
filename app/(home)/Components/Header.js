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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (token) {
      setToken(token);
      setUser(user);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    try {
      let api_url = process.env.NEXT_PUBLIC_API_URL;
      if (!api_url) {
        console.error('NEXT_PUBLIC_API_URL is not defined in .env file');
        return;
      }
      await axios.post(api_url + '/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      window.location.href = '/';
      
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">
          <Link href="/">E-Commerce</Link>
        </div>
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="text-gray-600 hover:text-gray-800">Home</Link>
          <Link href="#" className="text-gray-600 hover:text-gray-800">Shop</Link>
          <Link href="#" className="text-gray-600 hover:text-gray-800">About</Link>
          <Link href="#" className="text-gray-600 hover:text-gray-800">Contact</Link>
        </nav>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className='flex items-center space-x-4'>
            <button onClick={handleLogout} className="text-gray-400 hover:text-gray-800 flex items-center space-x-2">
              <span className='hidden sm:block'>Logout</span>
              <svg className="w-5 h-5 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5m0 6h6"></path>
              </svg>
            </button>
            {user && user.role === 'admin' && (
              <Link href={`/admin`} className="text-gray-400 hover:text-gray-800 flex items-center space-x-2">
                <span className='hidden sm:block'>Dashboard</span>
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-dashboard sm:hidden"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 13m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M13.45 11.55l2.05 -2.05" /><path d="M6.4 20a9 9 0 1 1 11.2 0z" /></svg>
              </Link>
            )}
            {user && user.role === 'user' && (
              <Link  href={`/dashboard`} className="text-gray-400 hover:text-gray-800">
                <span className='hidden sm:block'>Dashboard</span>
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-dashboard sm:hidden"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 13m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M13.45 11.55l2.05 -2.05" /><path d="M6.4 20a9 9 0 1 1 11.2 0z" /></svg>
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
          
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => dispatch(openCart())} className="text-gray-600 hover:text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 5M17 13l1.4 5M9 21h6M9 21a2 2 0 11-4 0M15 21a2 2 0 11-4 0"></path>
            </svg>
          </button>
        </div>
        <button onClick={toggleMobileMenu} className="md:hidden text-gray-600 hover:text-gray-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <Link href="/" className="block px-4 py-2 text-gray-600 hover:text-gray-800">Home</Link>
          <Link href="#" className="block px-4 py-2 text-gray-600 hover:text-gray-800">Shop</Link>
          <Link href="#" className="block px-4 py-2 text-gray-600 hover:text-gray-800">About</Link>
          <Link href="#" className="block px-4 py-2 text-gray-600 hover:text-gray-800">Contact</Link>
          {isLoggedIn ? (
            <div className="block px-4 py-2 text-gray-600 hover:text-gray-800">
              <button onClick={handleLogout} className="w-full text-left">Logout</button>
              {user && user.role === 'admin' && (
                <Link href={`/admin`} className="block px-4 py-2 text-gray-600 hover:text-gray-800">Dashboard</Link>
              )}
              {user && user.role === 'user' && (
                <Link href={`/dashboard`} className="block px-4 py-2 text-gray-600 hover:text-gray-800">Dashboard</Link>
              )}
            </div>
          ) : (
            <>
              <button onClick={() => dispatch(openRegister())} className="block px-4 py-2 text-gray-600 hover:text-gray-800">Register</button>
              <button onClick={() => dispatch(openLogin())} className="block px-4 py-2 text-gray-600 hover:text-gray-800">Login</button>
            </>
          )}
        </nav>
      )}
      {isRegisterOpen && <Register onClose={() => dispatch(closeRegister())} onOpenLogin={() => dispatch(openLogin())} />}
      {isLoginOpen && <Login onClose={() => dispatch(closeLogin())} onOpenRegister={() => dispatch(openRegister())} />}
      {isCartOpen && <Cart onClose={() => dispatch(closeCart())} />}
    </header>
  );
};

export default Header;