import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const { categoryId } = useParams(); // Get category ID from URL
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('categoryId', categoryId);
    formData.append('images', imageFile);

    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/products/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Product added successfully!');
        navigate(`/categories/${categoryId}/products`); // Redirect to category products
      } else {
        alert('Failed to add product.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Error adding product.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md p-6 rounded-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Product Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
