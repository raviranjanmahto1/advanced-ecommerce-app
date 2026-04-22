import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  adminInfo: any | null;
}

const initialState: AuthState = {
  adminInfo: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    syncAuthFromStorage: (state) => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('adminInfo');
        if (stored) {
          state.adminInfo = JSON.parse(stored);
        }
      }
    },
    setCredentials: (state, action: PayloadAction<any>) => {
      state.adminInfo = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('adminInfo', JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.adminInfo = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('adminInfo');
      }
    },
  },
});

export const { setCredentials, logout, syncAuthFromStorage } = authSlice.actions;
export default authSlice.reducer;
