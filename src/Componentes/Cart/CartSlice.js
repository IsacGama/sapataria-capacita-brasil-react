import { createSlice } from '@reduxjs/toolkit';

const calcularTotal = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const initialState = {
  items: [],
  total: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, size, image } = action.payload; // Garantir que image está incluído
      const existingItem = state.items.find(
        item => item.id === id && item.size === size
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        // Garante que todos os campos necessários estão presentes
        state.items.push({
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          image: action.payload.image, // Campo crítico para o checkout
          size: action.payload.size,
          quantity: action.payload.quantity || 1
        });
      }

      state.total = calcularTotal(state.items);
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(item => 
        !(item.id === action.payload.id && item.size === action.payload.size)
      );
      state.total = calcularTotal(state.items);
    },

    updateQuantity: (state, action) => {
      const { id, size, quantity } = action.payload;
      const itemIndex = state.items.findIndex(
        item => item.id === id && item.size === size
      );

      if (itemIndex !== -1) {
        if (quantity <= 0) {
          state.items.splice(itemIndex, 1);
        } else {
          state.items[itemIndex].quantity = quantity;
        }
        state.total = calcularTotal(state.items);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    }
  }
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;