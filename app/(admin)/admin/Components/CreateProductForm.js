"use client";
import React, { useState,useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const CreateProductForm = ({ fetchProducts }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    image: "",
    status: "active",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });
    
    const token = localStorage.getItem('token');
    const getHeaders = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", 
      },
      withCredentials: true
    };
    axios.post(`${apiUrl}/products`, formDataObj, getHeaders).then(() => {
      setFormData({
          name: "",
          description: "",
          price: "",
          category_id: "",
          image: "",
          status: "active",
        });
      Swal.fire({
        icon: 'success',
        title: 'Product Created',
        text: 'The product has been created successfully!',
      });
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });

    fetchProducts();
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/categories`);
      // console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  return (
    <div className="mb-2">
      <h1 className="text-3xl font-bold mb-2 text-gray-100">Create Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-100">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded bg-gray-800 text-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-100">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded bg-gray-800 text-gray-100"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="mb-4">
            <label className="block text-gray-100">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded bg-gray-800 text-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-100">Category Name</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded bg-gray-800 text-gray-100"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-100">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded bg-gray-800 text-gray-100"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-100">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded bg-gray-800 text-gray-100"
            />
          </div>
        </div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded" disabled={loading}>
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;
