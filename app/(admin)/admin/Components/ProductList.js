"use client";
import React, { useState } from "react";
import EditProductForm from "./EditProductForm";
import axios from "axios";
import Swal from 'sweetalert2';

const ProductList = ({ products, pagination, handlePageChange, fetchProducts }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const getPageNumber = (url) => {
        const params = new URL(url).searchParams;
        return params.get("page") ? Number(params.get("page")) : 1;
      };

    const handleEditClick = (product) => {
        setSelectedProduct(product);
    };

    const handleDeleteClick = (productId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              const apiUrl = process.env.NEXT_PUBLIC_API_URL;
              const token = localStorage.getItem('token');
              const getHeaders = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                withCredentials: true
              };
        
              axios.delete(`${apiUrl}/products/${productId}`, getHeaders).then(() => {
                fetchProducts();
                Swal.fire(
                  'Deleted!',
                  'The product has been deleted.',
                  'success'
                );
              }).catch((error) => {
                console.error('Failed to delete product:', error);
              });
            }
          });
    };

  return (
    <div>
      <hr className="my-5"/>
      <h1 className="text-3xl font-bold mb-4 text-gray-100">Product List</h1>
      <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-gray-800 text-gray-100">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-700">ID</th>
              <th className="py-2 px-4 border-b border-gray-700">Name</th>
              <th className="py-2 px-4 border-b border-gray-700">Price</th>
              <th className="py-2 px-4 border-b border-gray-700">Category Name</th>
              <th className="py-2 px-4 border-b border-gray-700">Image</th>
              <th className="py-2 px-4 border-b border-gray-700">Status</th>
              <th className="py-2 px-4 border-b border-gray-700">Delete</th>
              <th className="py-2 px-4 border-b border-gray-700">Action</th>

            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="py-2 px-4 border-b border-gray-700">{product.id}</td>
                <td className="py-2 px-4 border-b border-gray-700">{product.name}</td>
                <td className="py-2 px-4 border-b border-gray-700">{product.price}</td>
                <td className="py-2 px-4 border-b border-gray-700">{product.category && product.category.name}</td>
                <td className="py-2 px-4 border-b border-gray-700">{product.image}</td>
                <td className="py-2 px-4 border-b border-gray-700">{product.status}</td>
                <td className="py-2 px-4 border-b border-gray-700">{product.is_delete?"Yes":"No"}</td>
                <td className="py-2 px-4 border-b border-gray-700">
                  <div className="flex justify-center">
                  <button className="px-4 py-1 bg-blue-600 text-white rounded mr-2" onClick={() => handleEditClick(product)}>Edit</button>
                  <button className="px-4 py-1 bg-red-600 text-white rounded" onClick={() => handleDeleteClick(product.id)}>Delete</button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center">
        {pagination.length > 3 && pagination.map((link, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(getPageNumber(link.url))}
              className={`px-4 py-2 border rounded ${link.active ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-100"}`}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          ))}
      </div>
      {selectedProduct && (
        <EditProductForm product={selectedProduct} onClose={() => setSelectedProduct(null)} fetchProducts={fetchProducts} />
      )}
    </div>
  );
};

export default ProductList;
