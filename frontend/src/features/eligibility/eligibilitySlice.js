import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import eligibilityService from './eligibilityService';

const initialState = {
	eligibility: null,
	schemeEligibility: null,
	addedDetails: false,
	isSuccess: false,
	isError: false,
	isLoading: false,
	message: '',
};

export const checkScheme = createAsyncThunk(
	'check/scheme',
	async (schemeId, thunkAPI) => {
		try {
			return await eligibilityService.checkScheme(schemeId);
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

export const addSchemeCriteria = createAsyncThunk(
	'add/scheme/details',
	async ({ schemeId, data }, thunkAPI) => {
		try {
			console.log(schemeId, data);
			return await eligibilityService.addSchemeCriteria(schemeId, data);
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

export const eligibilitySlice = createSlice({
	name: 'eligibility',
	initialState,
	reducers: {
		reset: (state) => {
			state.isSuccess = false;
			state.isError = false;
			state.isLoading = false;
			state.addedDetails = false;
			state.message = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(checkScheme.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(checkScheme.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.eligibility = action.payload;
			})
			.addCase(checkScheme.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(addSchemeCriteria.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addSchemeCriteria.fulfilled, (state, action) => {
				state.isLoading = false;
				state.addedDetails = true;
				state.schemeEligibility = action.payload;
			})
			.addCase(addSchemeCriteria.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = eligibilitySlice.actions;
export default eligibilitySlice.reducer;
