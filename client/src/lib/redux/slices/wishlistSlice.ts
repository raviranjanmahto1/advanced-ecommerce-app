import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
  wishlistItems: any[];
}

const initialState: WishlistState = {
  wishlistItems: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    syncWishlistFromStorage: (state) => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('wishlist');
        if (stored) {
          state.wishlistItems = JSON.parse(stored);
        }
      }
    },
    toggleWishlist: (state, action: PayloadAction<any>) => {
      const item = action.payload;
      const existItem = state.wishlistItems.find((x) => x._id === item._id);

      if (existItem) {
        state.wishlistItems = state.wishlistItems.filter((x) => x._id !== item._id);
      } else {
        state.wishlistItems = [...state.wishlistItems, item];
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('wishlist', JSON.stringify(state.wishlistItems));
      }
    },
  },
});

export const { toggleWishlist, syncWishlistFromStorage } = wishlistSlice.actions;
export default wishlistSlice.reducer;
