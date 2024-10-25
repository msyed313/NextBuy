import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../features/Cart'; // Update with your cart slice actions
import { useNavigate } from 'react-router-dom';
const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const cart = useSelector((state) => state.cart.items); // Assuming your cart items are stored in `state.cart.items`

  // Function to handle quantity change
  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ productId, quantity }));
    }
  };
  const handleProceedToCheckout = (product) => {
    navigate('/checkout', { state: { productDetails: product }});
   // console.log(product);
    
  };
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cart.map((item) => (
            <div key={item.id} className="border rounded-lg shadow-lg overflow-hidden">
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="font-semibold text-xl mb-2">{item.title}</h2>

                {/* Quantity Input */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="bg-gray-300 text-gray-800 px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <span className="mx-4">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="bg-gray-300 text-gray-800 px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>

                {/* Price and Checkout */}
                <div className="text-right">
                  <p className="text-lg font-bold mb-2">
                    Item Total: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition" onClick={() => handleProceedToCheckout(item)}>
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
