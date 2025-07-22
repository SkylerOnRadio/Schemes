import { configureStore } from '@reduxjs/toolkit';
import schemeReducer from '../features/schemes/schemesSlice';
import authReducer from '../features/auth/authSlice';
import eligibilityReducer from '../features/eligibility/eligibilitySlice';
import feedbackReducer from '../features/feedback/feedbackSlice';
import detailsReducer from '../features/details/detailsSlice';

export const store = configureStore({
	reducer: {
		scheme: schemeReducer,
		auth: authReducer,
		eligibility: eligibilityReducer,
		feedback: feedbackReducer,
		details: detailsReducer,
	},
});
