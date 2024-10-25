import { configureStore } from "@reduxjs/toolkit";
import {Products} from "../features/Products";
import productReducer from '../features/Products'; 
import categoryReducer  from "../features/Category";
import categoryproductReducer from '../features/CategoryProducts'
import cartReducer from '../features/Cart'
import productdetailReducer from '../features/ProductDetails'
import checkoutReducer from '../features/Checkout';

export const store = configureStore({
  reducer: { 
    product: productReducer,
    category: categoryReducer,
    categoryproduct:categoryproductReducer,
    cart:cartReducer,
    productdetail:productdetailReducer,
    checkout: checkoutReducer,
  },
});