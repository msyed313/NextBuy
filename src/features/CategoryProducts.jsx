import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url ="https://api.escuelajs.co/api/v1/categories/1/products"
 // Get the categoryId from the URL
  
export const getcategoryproducts = createAsyncThunk(
  "getcategoryproductData",
  async (categoryId, { rejectWithValue }) => {
    console.log("Received categoryId:", categoryId);
    const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`);
    const data = await response.json();
   // console.log(categoryId);
    
    try {
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const CategoryProducts = createSlice({
  name: "categoryproduct",
  initialState: {
    categoryproduct: [],
    loading: false,
    error: null
  },

  extraReducers: (builder) => {
    builder
      .addCase(getcategoryproducts.pending,(state)=>{
        state.loading=true
      })
      .addCase(getcategoryproducts.fulfilled,(state,action)=>{
        state.loading=false
        state.categoryproduct=action.payload
      })
      .addCase(getcategoryproducts.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
      })
  }

});

export default CategoryProducts.reducer