import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import schemeService from './schemesService';

const initialState = {
	schemes: [],
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

export const schemeSlice = createSlice({
	name: 'scheme',
	initialState,
	reducers: { reset: (state) => initialState },
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
			});
	},
});

export const { reset } = schemeSlice.actions;
export default schemeSlice.reducer;
