import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  nextStep,
  prevStep,
  updateShippingDetails,
  updatePaymentDetails,
  confirmOrder,
} from '../features/Checkout';
import { useLocation ,useNavigate} from 'react-router-dom';
const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { productDetails } = location.state || {};
  const [currentStep, setCurrentStep] = React.useState(1);
  const [shippingDetails, setShippingDetails] = React.useState({});
  const [paymentDetails, setPaymentDetails] = React.useState({});
  const [isOrderConfirmed, setIsOrderConfirmed] = React.useState(false);

  const handleNextStep = () => setCurrentStep(currentStep + 1);
  const handlePrevStep = () => setCurrentStep(currentStep - 1);

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    const { name, address, city, country } = e.target.elements;
    setShippingDetails({
      name: name.value,
      address: address.value,
      city: city.value,
      country: country.value,
    });
    handleNextStep();
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const { cardNumber, expiryDate, cvv } = e.target.elements;
    setPaymentDetails({
      cardNumber: cardNumber.value,
      expiryDate: expiryDate.value,
      cvv: cvv.value,
    });
    handleNextStep();
  };

  const handleOrderConfirmation = () => {
    const order = {
      shippingDetails,
      paymentDetails,
      productDetails,
      total: 100, // You can calculate the total based on the product
      date: new Date().toLocaleString(),
    };

    // Check if 'orderHistory' exists in localStorage. If not, initialize as an empty array.
    let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];

    // Push the new order into the order history
    orderHistory.push(order);

    // Save the updated order history back to localStorage
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

    setIsOrderConfirmed(true);

    // After confirming the order, navigate to the Order History page
    setTimeout(() => {
      navigate('/orderhistory');
    }, 2000);
  };



  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">Checkout</h1>

      {currentStep === 1 && (
        <form onSubmit={handleShippingSubmit} className="space-y-6 bg-white shadow-md p-8 rounded-lg max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Shipping Details</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Next
          </button>
        </form>
      )}

      {currentStep === 2 && (
        <form onSubmit={handlePaymentSubmit} className="space-y-6 bg-white shadow-md p-8 rounded-lg max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Payment Details</h2>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            name="expiryDate"
            placeholder="Expiry Date"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
              Next
            </button>
            <button type="button" onClick={handlePrevStep} className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-400 transition">
              Back
            </button>
          </div>
        </form>
      )}

      {currentStep === 3 && (
        <div className="bg-white shadow-md p-8 rounded-lg max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Order Confirmation</h2>
          {/* Shipping details */}
          <div className="mb-4">
            <h3 className="text-red-700 text-xl font-semibold"> Shipping Details </h3>
            <p className="mb-2"><strong>Name:</strong> {shippingDetails.name}</p>
            <p className="mb-2"><strong>Address:</strong> {shippingDetails.address}, {shippingDetails.city}, {shippingDetails.country}</p>
          </div>
          {/* Product details */}
          {productDetails && (
            <div className="mb-4">
              <h3 className="text-red-700 text-xl font-semibold">Product Details</h3>
              <p className="mb-2"><strong>Product Name:</strong> {productDetails.title}</p>
              <p className="mb-2"><strong>Price:</strong> ${productDetails.price}</p>
              <p className="mb-2"><strong>Quantity:</strong> {1}</p>
            </div>
          )}
          <p className="mb-4"><strong>Total:</strong> ${productDetails ? productDetails.price * 1 : 100}</p>
          <div className="flex justify-between">
            <button onClick={handleOrderConfirmation} className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
              Confirm Order
            </button>
            <button type="button" onClick={handlePrevStep} className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-400 transition">
              Back
            </button>
          </div>
        </div>
      )}

      {isOrderConfirmed && (
        <div className="mt-10 text-center">
          <h2 className="text-3xl font-bold text-green-500">Order Confirmed!</h2>
          <p className="text-lg text-gray-700">Thank you for your purchase. Your order will be processed soon.</p>
        </div>
      )}
    </div>
  );
};

export default Checkout;
