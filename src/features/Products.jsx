import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const url ="https://api.escuelajs.co/api/v1/products"

export const getproducts = createAsyncThunk(
  "getproductData",
  async (args, { rejectWithValue }) => {
    const response = await fetch(url);
    const data = await response.json();

    try {
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const Products = createSlice({
  name: "product",
  initialState: {
    product: [],
    loading: false,
    error: null
  },

  extraReducers: (builder) => {
    builder
      .addCase(getproducts.pending,(state)=>{
        state.loading=true
      })
      .addCase(getproducts.fulfilled,(state,action)=>{
        state.loading=false
        state.product=action.payload
      })
      .addCase(getproducts.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
      })
  }

});

export default Products.reducer