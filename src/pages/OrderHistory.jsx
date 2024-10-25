import React, { useEffect, useState } from 'react';

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
    setOrderHistory(storedOrders);
  }, []);

  const handleDeleteOrder = (indexToDelete) => {
    // Create a new array without the deleted order
    const updatedOrders = orderHistory.filter((_, index) => index !== indexToDelete);
    
    // Update the state
    setOrderHistory(updatedOrders);
    
    // Update localStorage
    localStorage.setItem('orderHistory', JSON.stringify(updatedOrders));
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">Order History</h1>
      
      {orderHistory.length === 0 ? (
        <p className="text-center text-gray-700 text-lg">No orders have been placed yet.</p>
      ) : (
        <div className="space-y-6">
          {orderHistory.map((order, index) => (
            <div key={index} className="bg-white shadow-md p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-700">Order #{index + 1}</h2>
              <p><strong>Date:</strong> {order.date}</p>
              <p><strong>Name:</strong> {order.shippingDetails.name}</p>
              <p><strong>Address:</strong> {order.shippingDetails.address}, {order.shippingDetails.city}, {order.shippingDetails.country}</p>
              <p><strong>Product:</strong> {order.productDetails?.title || "N/A"}</p>
              <p><strong>Total:</strong> ${order.total}</p>

              {/* Delete button */}
              <button 
                onClick={() => handleDeleteOrder(index)} 
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
