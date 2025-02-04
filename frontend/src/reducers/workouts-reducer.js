import { createSlice } from '@reduxjs/toolkit';
import { ROLE } from '../constants';

const initialState = {
	workout: { id: '', name: 'Классика', time: '' },
	exercises: [],
	workoutExercises: [],
};

export const workoutSlice = createSlice({
	name: 'workout',
	initialState,
	reducers: {
		setWorkout: (state, action) => {
			return { ...state, workout: { ...state.workout, ...action.payload } };
		},
		setExercises: (state, action) => {
			return { ...state, exercises: [...action.payload] };
		},
		resetExercises: (state, action) => {
			return { ...state, exercises: initialState.exercises };
		},
		finishWorkout: (state, action) => {
			return initialState;
		},
		setWorkoutExercises: (state, action) => {
			return { ...state, workoutExercises: [...action.payload] };
		},
	},
	selectors: {
		selectWorkout: (state) => state.workout,
		selectWorkoutExercises: (state) => state.workoutExercises,
		selectExercises: (state) => state.exercises,
	},
});

export const { setExercises, setWorkout, resetExercises, setWorkoutExercises, setWorkoutTime } =
	workoutSlice.actions;
export const { selectWorkout, selectWorkoutExercises, selectExercises } = workoutSlice.selectors;
export const workoutReducer = workoutSlice.reducer;
