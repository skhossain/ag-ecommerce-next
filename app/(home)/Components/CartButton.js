'use client';
import { useDispatch } from "react-redux";
import { addItem } from "../../../features/cart/cartSlice";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CartButton = ({ product }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem('token');
    const getHeaders = {
    headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
    },
    withCredentials: true
    };

  const addToCart = async () => {
    
    try {
      setLoading(true);
        let qty =1;
        const response = await axios.post(`${apiUrl}/cart`, { product_id: product.id,quantity:qty },getHeaders);
        dispatch(addItem(response.data));
      Swal.fire({
        icon: 'success',
        title: 'Added to Cart',
        text: `${product.name} has been added to your cart.`,
        timer: 1500,
        showConfirmButton: false
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if(error.response.data.message == 'Unauthenticated.'){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Please login to add product to cart.',
        });
      }else{
        console.error("Error updating cart:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error adding the product to your cart.',
        });
      }
      
    }
  };

  return (
    <button onClick={addToCart} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded" disabled={loading}>
      {loading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
};

export default CartButton;
