"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateCategoryForm from "../Components/CreateCategoryForm";
import CategoryList from "../Components/CategoryList";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem('token');
  const getHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    withCredentials: true
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/category-list`,getHeaders);
      setCategories(response.data.data);
      setPagination(response.data.links);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleEdit = (category) => {
    setCategoryToEdit(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCategoryToEdit(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 w-full">
      <div className="container mx-auto px-4 py-8 w-1/2 p-4 border rounded-md">
        <CreateCategoryForm fetchCategories={fetchCategories} />
        <CategoryList categories={categories} onEdit={handleEdit} pagination={pagination} fetchCategories={fetchCategories} />
      </div>
    </div>
  );
};

export default Categories;
