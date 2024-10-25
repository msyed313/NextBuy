import React from 'react'
import { useDispatch } from 'react-redux'; 
import { addToCart } from '../features/Cart';
import { getproductdetails } from '../features/ProductDetails';
function CategoryProductCard({data}) {
    //console.log(data);
    const dispatch = useDispatch();

    // Handle adding product to cart
    const handleAddToCart = (product) => {
      dispatch(addToCart(product)); // Dispatch the product to add to cart
    };

  // Function to handle product click
  const handleproductClick = (productId) => {
    console.log('sending product id: ',productId);
    dispatch(getproductdetails(productId)); // Dispatch the thunk with the selected category ID
};
  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-10">Products</h2>

      {data.length === 0 ? (
        <p className="text-center text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.slice(0,10).map(product => (
            <div key={product.id} className="border rounded-lg shadow-lg overflow-hidden">
              <img src={product.images[0]} alt={product.name} className="w-full h-64 object-cover" />
              <div className="p-4 text-center">
                <h3 className="content-center h-20 items-center font-semibold lg:text-xl md:text-lg mb-2">{product.title}</h3>
                <p className="text-lg font-bold">${product.price}</p>
                <button
                    onClick={() => handleAddToCart(product)}
                    className="text-green-100 hover:text-red-700 transition-colors"
                    aria-label="Add to Cart"
                  >
                    {/* Add cart icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 inline-block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2.38 2H21m-5 6a3 3 0 100 6 3 3 0 000-6zm-10 0a3 3 0 100 6 3 3 0 000-6z"
                      />
                    </svg>
                    Add to Cart
                  </button>
                  <button onClick={()=>handleproductClick}>
                  <a href={`/product/${product.id}`} className="ml-1.5 text-blue-500 hover:underline">
                    View Details
                  </a>
                  </button>
                 
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryProductCard