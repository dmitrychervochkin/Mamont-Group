import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	exercises: {
		count: '',
		rows: [],
	},
	exercisesInfo: [],
};

export const exercisesSlice = createSlice({
	name: 'exercises',
	initialState,
	reducers: {
		setExercises: (state, action) => {
			return { ...state, exercises: { ...action.payload } };
		},
		setExercisesInfo: (state, action) => {
			return { ...state, exercisesInfo: [...action.payload] };
		},
		resetExercises: (state, action) => {
			return initialState;
		},
	},
	selectors: {
		selectExercises: (state) => state.exercises,
		selectExercisesInfo: (state) => state.exercisesInfo,
	},
});

export const { setExercises, setExercisesInfo, resetExercises } = exercisesSlice.actions;
export const { selectExercises, selectExercisesInfo } = exercisesSlice.selectors;
export const exercisesReducer = exercisesSlice.reducer;
