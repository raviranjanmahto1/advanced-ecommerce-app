import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  userInfo: any | null;
}

const initialState: AuthState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    syncAuthFromStorage: (state) => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('userInfo');
        if (stored) {
          state.userInfo = JSON.parse(stored);
        }
      }
    },
    setCredentials: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.userInfo = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userInfo');
      }
    },
  },
});

export const { setCredentials, logout, syncAuthFromStorage } = authSlice.actions;
export default authSlice.reducer;
