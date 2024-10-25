import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getproductdetails } from '../features/ProductDetails';
import { addToCart } from '../features/Cart';

const ProductDetail = () => {
  const { id } = useParams(); // Get product ID from the URL
  const navigate = useNavigate(); 
  const { error, loading, productdetail } = useSelector((state) => state.productdetail);
  const dispatch = useDispatch();

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); // Dispatch the product to add to cart
  };

  // Handle proceeding to checkout
  const handleProceedToCheckout = (product) => {
    //handleAddToCart(product); // Optionally add product to cart
    navigate('/checkout', { state: { productDetails: product }}); // Navigate to checkout and pass product details
  };

  useEffect(() => {
    dispatch(getproductdetails(id)); // Fetch product details whenever the ID changes
  }, [id, dispatch]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {productdetail ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="border rounded-lg overflow-hidden">
            <img
              src={productdetail.images}
              alt={productdetail.title}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="p-4">
            <h1 className="text-4xl font-bold mb-4">{productdetail.title}</h1>
            <p className="text-lg text-white mb-4">{productdetail.description}</p>
            <p className="text-2xl font-bold mb-4">${productdetail.price}</p>
            
            <div className="mt-6 grid lg:grid-cols-2 gap-10 md:grid-cols-1 gap-2 sm:grid-cols-2">
              {/* Add to Cart Button */}
              <button className="mt-1 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition" onClick={() => handleAddToCart(productdetail)}>
                Add to Cart
              </button>

              {/* Proceed to Checkout Button */}
              <button className="mt-1 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition" onClick={() => handleProceedToCheckout(productdetail)}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductDetail;
