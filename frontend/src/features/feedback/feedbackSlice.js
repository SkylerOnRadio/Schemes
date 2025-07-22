import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import feedbackService from './feedbackService';

const initialState = {
	feedback: null,
	isSuccess: false,
	isError: false,
	isLoading: false,
	feedbackAdded: false,
	message: '',
};

export const getSchemeFeedbacks = createAsyncThunk(
	'feedback/scheme',
	async (scheme_id, thunkAPI) => {
		try {
			return await feedbackService.getSchemeFeedbacks(scheme_id);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const postSchemeFeedback = createAsyncThunk(
	'feedback/add',
	async ({ scheme_id, feedback }, thunkAPI) => {
		try {
			return await feedbackService.postSchemeFeedback(scheme_id, feedback);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const feedbackSlice = createSlice({
	name: 'feedback',
	initialState,
	reducers: {
		reset: (state) => {
			state.isSuccess = false;
			state.isError = false;
			state.isLoading = false;
			state.message = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getSchemeFeedbacks.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getSchemeFeedbacks.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.feedback = action.payload;
			})
			.addCase(getSchemeFeedbacks.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(postSchemeFeedback.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(postSchemeFeedback.fulfilled, (state, action) => {
				state.isLoading = false;
				state.feedbackAdded = true;
				state.feedback = [...(state.feedback || []), action.payload];
			})
			.addCase(postSchemeFeedback.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = feedbackSlice.actions;
export default feedbackSlice.reducer;
