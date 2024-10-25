import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigation

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/categories');
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError('Failed to fetch categories');
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  // Handle delete category
  const handleDeleteCategory = async (id) => {
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCategories(categories.filter((category) => category.id !== id));
        alert(`Category with ID: ${id} deleted successfully.`);
      } else {
        alert('Failed to delete the category');
      }
    } catch (err) {
      alert('Error deleting the category');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Manage Categories</h2>

      <button 
        className="bg-blue-500 text-white px-4 py-2 mb-4 rounded hover:bg-blue-600 transition-all duration-200"
        onClick={() => navigate('/admin/addcategory')} // Navigate to Add Category page
      >
        Add Category
      </button>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      {categories.length === 0 ? (
        <p className="text-center text-gray-700">No categories found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <li key={category.id} className="p-4 border rounded flex flex-col justify-between items-center bg-white shadow-md">
              <button onClick={() => navigate(`/admin/${category.id}/products`,{state:{categoryId:category.id}})} className="text-lg font-medium">{category.name}</button>
              <button
                className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600 transition-all duration-200"
                onClick={() => handleDeleteCategory(category.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryManagement;
