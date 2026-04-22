import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RecentState {
  recentItems: any[];
}

const initialState: RecentState = {
  recentItems: typeof window !== 'undefined' && localStorage.getItem('recentItems') 
    ? JSON.parse(localStorage.getItem('recentItems') as string) 
    : [],
};

const recentSlice = createSlice({
  name: 'recent',
  initialState,
  reducers: {
    addRecentItem: (state, action: PayloadAction<any>) => {
      const item = action.payload;
      // Remove it if it already exists so we can push it to the top
      state.recentItems = state.recentItems.filter((x) => x._id !== item._id);
      // Add to the front of the array
      state.recentItems.unshift(item);
      // Keep only the 8 most recent items
      if (state.recentItems.length > 8) {
        state.recentItems.pop();
      }
      localStorage.setItem('recentItems', JSON.stringify(state.recentItems));
    },
    clearRecentItems: (state) => {
      state.recentItems = [];
      localStorage.removeItem('recentItems');
    }
  },
});

export const { addRecentItem, clearRecentItems } = recentSlice.actions;
export default recentSlice.reducer;
