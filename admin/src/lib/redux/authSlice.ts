import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  adminInfo: any | null;
}

const initialState: AuthState = {
  adminInfo: typeof window !== 'undefined' && localStorage.getItem('adminInfo') 
    ? JSON.parse(localStorage.getItem('adminInfo') as string) 
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<any>) => {
      state.adminInfo = action.payload;
      localStorage.setItem('adminInfo', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.adminInfo = null;
      localStorage.removeItem('adminInfo');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
