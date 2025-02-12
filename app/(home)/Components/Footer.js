import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">E-Commerce</h2>
            <p className="text-gray-400">Your one-stop shop for all your needs.</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul>
              <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="/shop" className="text-gray-400 hover:text-white">Shop</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white">About</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Follow Us</h2>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-gray-400 hover:text-white">Facebook</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Instagram</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">LinkedIn</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h2 className="text-xl font-bold mb-4">Newsletter</h2>
            <form>
              <input type="email" placeholder="Your email" className="w-full px-4 py-2 mb-4 text-gray-800" />
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          &copy; 2025 E-Commerce. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;