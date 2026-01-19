import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import { logout } from '../slices/authSlice';

export const rtkQueryErrorLogger: Middleware = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {

    if (action.payload && (action.payload as any).status === 401) {
      console.warn('Token is not valid...');
      
      api.dispatch(logout());
    }
  }

  return next(action);
};