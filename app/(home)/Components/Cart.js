import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { closeCart } from '../../../features/modal/modalSlice';
import { setItems, removeItem, updateItemQuantity } from '../../../features/cart/cartSlice';
import axios from 'axios';

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem('token');
  const getHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    withCredentials: true
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${apiUrl}/cart`, getHeaders);
        dispatch(setItems(response.data));
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [dispatch, apiUrl]);

  const handleRemoveItem = async (item) => {
    setLoading(true);
    setDeleting(true);
    try {
      await axios.delete(`${apiUrl}/cart/${item.id}`, getHeaders);
      dispatch(removeItem(item));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    } finally {
      setLoading(false);
      setDeleting(false);
    }
  };

  const handleQuantityChange = async (item, quantity) => {
    if (quantity < 1) return;
    try {
      await axios.put(`${apiUrl}/cart/${item.id}`, { quantity }, getHeaders);
      dispatch(updateItemQuantity({ id: item.id, quantity }));
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    router.push('/checkout');
    dispatch(closeCart());
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white text-gray-600 rounded-lg shadow-lg w-full max-w-md">
        <div className="p-4 border-b relative">
          <h2 className="text-2xl font-bold">Cart</h2>
          <button onClick={() => dispatch(closeCart())} className="text-gray-600 hover:text-gray-800 absolute top-0 right-0 p-4 text-xl">
            &times;
          </button>
        </div>
        <div className="p-4 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="text-center">
              <div className="loader"></div>
              <p>Loading cart items...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <p className="text-gray-700">Your cart is empty.</p>
          ) : (
            <div>
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id} className="flex justify-between items-center mb-4 odd:bg-gray-100 p-2">
                    <div>
                      <span className="font-bold">{item.product.name}</span>
                      <div className="text-sm text-gray-500">Unit Price: {item.product.price} TK</div>
                      <div className="text-sm text-gray-500">Total: {(item.product.price * item.quantity).toFixed(2)} TK</div>
                      <div className="flex items-center mt-2">
                        <button onClick={() => handleQuantityChange(item, item.quantity - 1)} className="px-2 py-1 bg-gray-300 rounded-l">
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                          className="w-12 text-center border-t border-b"
                          min="1"
                        />
                        <button onClick={() => handleQuantityChange(item, item.quantity + 1)} className="px-2 py-1 bg-gray-300 rounded-r">
                          +
                        </button>
                      </div>
                    </div>
                    <button onClick={() => handleRemoveItem(item)} className="text-red-600 hover:text-red-800">
                      {deleting ? <div className="loader"></div> : "Remove"}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>{calculateTotal()} TK</span>
                </div>
                <button onClick={handleCheckout} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-4">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;