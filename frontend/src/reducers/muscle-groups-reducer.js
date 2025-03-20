import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	muscleGroups: [],
};

export const muscleGroupsSlice = createSlice({
	name: 'muscleGroups',
	initialState,
	reducers: {
		setMuscleGroups: (state, action) => {
			return { ...state, muscleGroups: [...action.payload] };
		},
		resetMuscleGroups: (state, action) => {
			return initialState;
		},
	},
	selectors: {
		selectMuscleGroups: (state) => state.muscleGroups,
	},
});

export const { setMuscleGroups, resetMuscleGroups } = muscleGroupsSlice.actions;
export const { selectMuscleGroups } = muscleGroupsSlice.selectors;
export const muscleGroupsReducer = muscleGroupsSlice.reducer;
