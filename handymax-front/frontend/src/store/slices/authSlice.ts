import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: number;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
}

interface AuthState {
  user: User | null;
  isAuth: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuth: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action: Log in + save user
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    // Action: Log out 
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;