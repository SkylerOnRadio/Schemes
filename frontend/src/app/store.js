import { configureStore } from '@reduxjs/toolkit';
import schemeReducer from '../features/schemes/schemesSlice';

export const store = configureStore({
	reducer: { scheme: schemeReducer },
});
