// features/checkoutSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 1,
  shippingDetails: {
    name: '',
    address: '',
    city: '',
    country: '',
  },
  paymentDetails: {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  },
  isOrderConfirmed: false,
  orderHistory: [],
};

const Checkout = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      state.currentStep -= 1;
    },
    updateShippingDetails: (state, action) => {
      state.shippingDetails = { ...state.shippingDetails, ...action.payload };
    },
    updatePaymentDetails: (state, action) => {
      state.paymentDetails = { ...state.paymentDetails, ...action.payload };
    },
    confirmOrder: (state, action) => {
      state.isOrderConfirmed = true;
      // Save the confirmed order details in the order history
      state.orderHistory.push({
       /* shippingDetails: state.shippingDetails,
        paymentDetails: state.paymentDetails,
        productDetails: action.payload, // Pass product details
        total: 100, // Example total, you can pass actual total here
        date: new Date().toLocaleString(), // Add the current date*/
        product:'hello'
      });
    }
  },
});

export const {
  nextStep,
  prevStep,
  updateShippingDetails,
  updatePaymentDetails,
  confirmOrder,
} = Checkout.actions;
export default Checkout.reducer;
