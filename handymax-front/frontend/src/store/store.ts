import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { api } from './api'
import { rtkQueryErrorLogger } from './middleware/authMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    
    [api.reducerPath]: api.reducer,
  },

   middleware: (getDefaultMiddleware: any) => getDefaultMiddleware().concat(api.middleware).concat(rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;