import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import schemeService from './schemesService';

const initialState = {
	schemes: [],
	scheme: {
		title: '',
		benefits: [],
		objectives: [],
		eligibility: [],
		agency: '',
		summary: '',
	},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

//show schemes
export const getSchemes = createAsyncThunk(
	'schemes/getAll',
	async (__dirname, thunkAPI) => {
		try {
			return await schemeService.getSchemes();
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

//show specific scheme
export const getScheme = createAsyncThunk(
	'scheme/getOne',
	async (id, thunkAPI) => {
		try {
			return await schemeService.getScheme(id);
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

export const schemeSlice = createSlice({
	name: 'scheme',
	initialState,
	reducers: {
		reset: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
			state.message = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getSchemes.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getSchemes.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.schemes = action.payload;
			})
			.addCase(getSchemes.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getScheme.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getScheme.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.scheme = action.payload;
			})
			.addCase(getScheme.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = schemeSlice.actions;
export default schemeSlice.reducer;
