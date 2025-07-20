import { configureStore } from '@reduxjs/toolkit';
import schemeReducer from '../features/schemes/schemesSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
	reducer: { scheme: schemeReducer, auth: authReducer },
});
