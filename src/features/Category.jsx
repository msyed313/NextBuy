import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const url ="https://api.escuelajs.co/api/v1/categories"

export const getcategories = createAsyncThunk(
  "getcategoryData",
  async (args, { rejectWithValue }) => {
    const response = await fetch(url);
    const data = await response.json();
    //console.log(args);
    
    try {
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const Category = createSlice({
  name: "category",
  initialState: {
    category: [],
    loading: false,
    error: null
  },

  extraReducers: (builder) => {
    builder
      .addCase(getcategories.pending,(state)=>{
        state.loading=true
      })
      .addCase(getcategories.fulfilled,(state,action)=>{
        state.loading=false
        state.category=action.payload
      })
      .addCase(getcategories.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
      })
  }

});

export default Category.reducer