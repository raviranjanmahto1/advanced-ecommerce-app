import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RecentState {
  recentItems: any[];
}

const initialState: RecentState = {
  recentItems: [],
};

const recentSlice = createSlice({
  name: 'recent',
  initialState,
  reducers: {
    syncRecentFromStorage: (state) => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('recentItems');
        if (stored) {
          state.recentItems = JSON.parse(stored);
        }
      }
    },
    addRecentItem: (state, action: PayloadAction<any>) => {
      const item = action.payload;
      state.recentItems = state.recentItems.filter((x) => x._id !== item._id);
      state.recentItems.unshift(item);
      if (state.recentItems.length > 8) {
        state.recentItems.pop();
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('recentItems', JSON.stringify(state.recentItems));
      }
    },
    clearRecentItems: (state) => {
      state.recentItems = [];
      if (typeof window !== 'undefined') {
        localStorage.removeItem('recentItems');
      }
    }
  },
});

export const { addRecentItem, clearRecentItems, syncRecentFromStorage } = recentSlice.actions;
export default recentSlice.reducer;
