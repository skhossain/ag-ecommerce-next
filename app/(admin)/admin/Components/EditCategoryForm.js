"use client";
import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const EditCategoryForm = ({ fetchCategories, categoryToEdit, closeModal }) => {
  const [categoryName, setCategoryName] = useState(categoryToEdit ? categoryToEdit.name : "");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');
  const getHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    withCredentials: true
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const request = categoryToEdit
      ? axios.put(`${apiUrl}/categories/${categoryToEdit.id}`, { name: categoryName }, getHeaders)
      : axios.post(`${apiUrl}/categories`, { name: categoryName }, getHeaders);

    request.then(() => {
      setCategoryName("");
      Swal.fire({
        icon: 'success',
        title: categoryToEdit ? 'Category Updated' : 'Category Created',
        text: `The category has been ${categoryToEdit ? 'updated' : 'created'} successfully!`,
      });
      setLoading(false);
      fetchCategories();
closeModal();
    }).catch(() => {
      setLoading(false);
    });
  };

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-4 text-ray-100 ">{categoryToEdit ? 'Edit Category' : 'Create Category'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-100">Name</label>
          <input
            type="text"
            name="name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full px-4 py-2 border rounded bg-gray-800 text-gray-100"
          />
        </div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded" disabled={loading}>
          {loading ? (categoryToEdit ? 'Updating...' : 'Creating...') : (categoryToEdit ? 'Update Category' : 'Create Category')}
        </button>
      </form>
    </div>
  );
};

export default EditCategoryForm;
