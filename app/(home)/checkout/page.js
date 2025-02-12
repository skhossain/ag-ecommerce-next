'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { setItems } from '../../../features/cart/cartSlice';

const Checkout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);
  const [address, setAddress] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            router.push('/');
        }

    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const getHeaders = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        };   
        const response = await axios.get(`${apiUrl}/cart`, getHeaders);
        dispatch(setItems(response.data));
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [dispatch, apiUrl]);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
        const getHeaders = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        };   
      await axios.post(`${apiUrl}/orders`, { cartItems, address }, getHeaders);
      // Handle successful checkout
      setAddress({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: ''
      });
      Swal.fire({
              icon: 'success',
              title: 'Order Genarated',
              text: 'Order Genarated successfully!',
            });
      dispatch(setItems([])); // Clear cart items
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container mx-auto px-4 py-8 dark:text-white">
      <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Delivery Address</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-white">Name</label>
              <input
                type="text"
                name="name"
                value={address.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-white">Email</label>
              <input
                type="email"
                name="email"
                value={address.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-white">Phone</label>
              <input
                type="text"
                name="phone"
                value={address.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-white">Address</label>
              <input
                type="text"
                name="address"
                value={address.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-white">City</label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-white">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={address.postalCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-white">Country</label>
              <input
                type="text"
                name="country"
                value={address.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded text-gray-700"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded" disabled={loading}>
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between mb-4">
                <span>{item.product.name} x {item.quantity}</span>
                <span>{(item.product.price * item.quantity).toFixed(2)} TK</span>
              </li>
            ))}
          </ul>
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>{calculateTotal()} TK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
