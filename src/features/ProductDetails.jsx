import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getproductdetails = createAsyncThunk(
  "getproductdetailsData",
  async (productId, { rejectWithValue }) => {
    console.log("Received productId:", productId);
    const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`);
    const data = await response.json();
   // console.log(categoryId);
    
    try {
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const ProductDetails = createSlice({
  name: "productdetails",
  initialState: {
    productdetail: [],
    loading: false,
    error: null
  },

  extraReducers: (builder) => {
    builder
      .addCase(getproductdetails.pending,(state)=>{
        state.loading=true
      })
      .addCase(getproductdetails.fulfilled,(state,action)=>{
        state.loading=false
        state.productdetail=action.payload
      })
      .addCase(getproductdetails.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
      })
  }

});

export default ProductDetails.reducer