import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Componentes/Cart/CartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});