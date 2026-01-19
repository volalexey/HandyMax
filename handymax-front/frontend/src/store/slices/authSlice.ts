import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: number;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';

  phone?: string | null;
  description?: string | null;
  avatarUrl?: string | null;
  workingHours?: string | null;
  contactEmail?: string | null;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuth: boolean;
  isLoginModalOpen: boolean;
}

const storedUser = localStorage.getItem('user');
const storedToken = localStorage.getItem('token');

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token'),
  isAuth: !!localStorage.getItem('token'),
  isLoginModalOpen: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { user, token } }: PayloadAction<{ user: User; token: string }>) => {
      state.user = user;
      state.token = token;
      state.isAuth = true;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      state.isLoginModalOpen = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuth = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    openLoginModal: (state) =>{
      state.isLoginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.isLoginModalOpen = false;
    }
  },
});

export const { setCredentials, logout, openLoginModal, closeLoginModal } = authSlice.actions;
export default authSlice.reducer;