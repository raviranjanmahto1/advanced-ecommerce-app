import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
  wishlistItems: any[];
}

const initialState: WishlistState = {
  wishlistItems: typeof window !== 'undefined' && localStorage.getItem('wishlist') 
    ? JSON.parse(localStorage.getItem('wishlist') as string) 
    : [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<any>) => {
      const item = action.payload;
      const existItem = state.wishlistItems.find((x) => x._id === item._id);

      if (existItem) {
        state.wishlistItems = state.wishlistItems.filter((x) => x._id !== item._id);
      } else {
        state.wishlistItems = [...state.wishlistItems, item];
      }

      localStorage.setItem('wishlist', JSON.stringify(state.wishlistItems));
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
