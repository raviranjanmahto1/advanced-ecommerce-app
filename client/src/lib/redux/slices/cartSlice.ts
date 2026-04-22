import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  cartItems: any[];
  shippingAddress: any;
  paymentMethod: string;
}

const initialState: CartState = {
  cartItems: [],
  shippingAddress: {},
  paymentMethod: 'PayPal',
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
        const shipping = localStorage.getItem('shippingAddress');
        if (shipping) state.shippingAddress = JSON.parse(shipping);
        const payment = localStorage.getItem('paymentMethod');
        if (payment) state.paymentMethod = JSON.parse(payment);
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
    saveShippingAddress: (state, action: PayloadAction<any>) => {
      state.shippingAddress = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
      }
    },
    savePaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('paymentMethod', JSON.stringify(action.payload));
      }
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
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

export const { addToCart, removeFromCart, syncCartFromStorage, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;
