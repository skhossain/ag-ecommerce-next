"use client";
import React, { useState, useEffect } from "react";
import EditCategoryForm from "./EditCategoryForm";
import Modal from "react-modal";

Modal.setAppElement('body'); // Set the app element for react-modal

const CategoryList = ({ categories,pagination, onEdit, onDelete, fetchCategories,handlePageChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const handleEdit = (category) => {
    setCategoryToEdit(category);
    setIsModalOpen(true);
  };

  const handleDelete = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      onDelete(categoryId);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCategoryToEdit(null);
    fetchCategories();
  };

  const getPageNumber = (url) => {
    const params = new URL(url).searchParams;
    return params.get("page") ? Number(params.get("page")) : 1;
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-gray-100">Category List</h1>
      <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-gray-800 text-gray-100">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-700">ID</th>
              <th className="py-2 px-4 border-b border-gray-700">Name</th>
              <th className="py-2 px-4 border-b border-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="py-2 px-4 border-b border-gray-700">{category.id}</td>
                <td className="py-2 px-4 border-b border-gray-700">{category.name}</td>
                <td className="py-2 px-4 border-b border-gray-700">
                  <div className="flex justify-center">
                    <button
                      className="px-4 py-1 bg-blue-600 text-white rounded mr-2"
                      onClick={() => handleEdit(category)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 py-1 bg-red-600 text-white rounded"
                      onClick={() => handleDelete(category.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
      </div>
      <Modal
        className="dark:bg-gray-800 dark:text-gray-100 w-96 mx-auto my-20 p-4 rounded-lg"
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      >
        <button className="absolute top-2 right-2 text-gray-100 dark:text-gray-800" onClick={closeModal}>
          &times;
        </button>
        <EditCategoryForm
          fetchCategories={fetchCategories}
          categoryToEdit={categoryToEdit}
          closeModal={closeModal}
        />
      </Modal>
    </div>
  );
};

export default CategoryList;
