import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductCategory = () => {
  const { categoryId } = useParams(); // Get category ID from URL
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchCategoryProducts();
  }, [categoryId]);
  // Fetch products related to the category
  const fetchCategoryProducts = async () => {
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`);
      const data = await response.json();
      setProducts(data);
      if (data.length > 0) {
        setCategoryName(data[0]?.category?.name || 'Category'); // Set category name
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`, {
        method: 'DELETE',
      });
      fetchCategoryProducts()
     // setProducts(products.filter(product => product.id !== productId)); // Update the list after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleAddProduct = () => {
    navigate(`/admin/addproduct/${categoryId}`); // Navigate to add product page
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">{categoryName} - Products</h1>
      <button 
        className="bg-blue-500 text-white px-4 py-2 mb-6 rounded hover:bg-blue-600 transition duration-200"
        onClick={handleAddProduct}
      >
        Add Product
      </button>
      <button 
        className="ml-2 bg-blue-500 text-white px-4 py-2 mb-6 rounded hover:bg-blue-600 transition duration-200"
        onClick={()=>navigate('/admin')}
      >
        Categories
      </button>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products available for this category.</p>
      ) : (
        <ul className="space-y-6">
          {products.map(product => (
            <li key={product.id} className="border p-4 rounded-lg flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <p>Price: ${product.price}</p>
                <img src={product.images[0]} alt={product.title} className="w-32 h-32 object-cover mt-2" />
              </div>
              <button 
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                onClick={() => handleDeleteProduct(product.id)}
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

export default ProductCategory;
