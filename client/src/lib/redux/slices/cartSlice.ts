import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  cartItems: any[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    syncCartFromStorage: (state) => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('cart');
        if (stored) {
          state.cartItems = JSON.parse(stored);
        }
      }
    },
    addToCart: (state, action: PayloadAction<any>) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.cartItems));
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.cartItems));
      }
    },
  },
});

export const { addToCart, removeFromCart, syncCartFromStorage } = cartSlice.actions;
export default cartSlice.reducer;
