import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !imageFile) {
      alert('Please provide both category name and image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', imageFile); // Append the image file to the form data

    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/categories', {
        method: 'POST',
        body: formData, // Send the form data as the request body
      });

      if (response.ok) {
        alert('Category added successfully!');
        navigate('/categories'); // Redirect back to the category management page
      } else {
        alert('Failed to add category.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Error adding category.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Add New Category</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md p-6 rounded-lg" encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Category Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Select Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600 transition-all duration-200 w-full"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
