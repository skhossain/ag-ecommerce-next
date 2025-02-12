"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateProductForm from "../Components/CreateProductForm";
import ProductList from "../Components/ProductList";
import { Suspense } from "react";

const token = localStorage.getItem('token');
const getHeaders = {
  headers: {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json'
  },
  withCredentials: true
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = (page = 1) => {
    axios.get(`${apiUrl}/product-list?page=${page}`,getHeaders).then((response) => {
    setProducts(response.data.data);
    // console.log(response.data.links); 
    console.log(response.data.data); 
    setPagination(response.data.links);
    });
  };

  const handlePageChange = (page) => {
    fetchProducts(page);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <CreateProductForm fetchProducts={fetchProducts} />
      <Suspense fallback={<p>Loading...</p>}>
        <ProductList products={products} pagination={pagination} handlePageChange={handlePageChange} fetchProducts={fetchProducts} />
      </Suspense>
    </div>
  );
};

export default ProductsPage;
