import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	types: [],
};

export const typesSlice = createSlice({
	name: 'types',
	initialState,
	reducers: {
		setTypes: (state, action) => {
			return { ...state, types: [...action.payload] };
		},
		resetTypes: (state, action) => {
			return initialState;
		},
	},
	selectors: {
		selectTypes: (state) => state.types,
	},
});

export const { setTypes, resetTypes } = typesSlice.actions;
export const { selectTypes } = typesSlice.selectors;
export const typesReducer = typesSlice.reducer;
