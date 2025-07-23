import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import detailsService from './detailsService';

const initialState = {
	details: {
		gender: '',
		age: '',
		income: '',
		caste: '',
		disability: false,
		marital_status: '',
		minority: false,
		locality: '',
		below_poverty: false,
		student: false,
	},
	isSuccess: false,
	isError: false,
	isLoading: false,
	message: '',
};

export const getUserDetails = createAsyncThunk(
	'/user/details',
	async (_, thunkAPI) => {
		try {
			return await detailsService.getUserDetails();
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

export const postUserDetails = createAsyncThunk(
	'/user/add',
	async (userData, thunkAPI) => {
		try {
			return await detailsService.postUserDetails(userData);
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

export const updateUserDetails = createAsyncThunk(
	'/user/update',
	async (userData, thunkAPI) => {
		try {
			return await detailsService.updateUserDetails(userData);
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

const detailsSlice = createSlice({
	name: 'details',
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
			.addCase(getUserDetails.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserDetails.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.details = action.payload;
			})
			.addCase(getUserDetails.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(postUserDetails.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(postUserDetails.fulfilled, (state, action) => {
				state.isLoading = false;
				state.addedDetails = true;
				state.details = action.payload;
			})
			.addCase(postUserDetails.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(updateUserDetails.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateUserDetails.fulfilled, (state, action) => {
				state.isLoading = false;
				state.updatedDetails = true;
				state.details = action.payload;
			})
			.addCase(updateUserDetails.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = detailsSlice.actions;
export default detailsSlice.reducer;
