import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	exercise: {
		id: '',
		name: '',
		description: '',
		userId: '',
		muscleGroupId: '',
	},
	exerciseInfo: [],
};

export const exerciseSlice = createSlice({
	name: 'exercise',
	initialState,
	reducers: {
		setExercise: (state, action) => {
			return { ...state, exercise: { ...action.payload } };
		},
		setExerciseInfo: (state, action) => {
			return { ...state, exerciseInfo: [...action.payload] };
		},
		resetExercise: (state, action) => {
			return initialState;
		},
	},
	selectors: {
		selectExercise: (state) => state.exercise,
		selectExerciseInfo: (state) => state.exerciseInfo,
	},
});

export const { setExercise, setExerciseInfo, resetExercise } = exerciseSlice.actions;
export const { selectExercise, selectExerciseInfo } = exerciseSlice.selectors;
export const exerciseReducer = exerciseSlice.reducer;
