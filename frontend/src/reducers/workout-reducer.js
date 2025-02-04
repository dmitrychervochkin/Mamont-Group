import { createSlice } from '@reduxjs/toolkit';
import { ROLE } from '../constants';

const initialState = {
	userWorkout: { id: '', name: 'Классика', time: '', createdAt: '', userId: '' },
	userExercises: [],
	userWorkoutExercises: [],
};

export const workoutSlice = createSlice({
	name: 'workout',
	initialState,
	reducers: {
		setUserWorkout: (state, action) => {
			return { ...state, userWorkout: { ...state.userWorkout, ...action.payload } };
		},
		setUserWorkoutTime: (state, action) => {
			return { ...state, userWorkout: { ...state.userWorkout, time: action.payload } };
		},
		setUserExercises: (state, action) => {
			return { ...state, userExercises: [...action.payload] };
		},
		setUserWorkoutExercises: (state, action) => {
			return { ...state, userWorkoutExercises: [...action.payload] };
		},
		finishWorkout: (state, action) => {
			return initialState;
		},
	},
	selectors: {
		selectUserWorkout: (state) => state.userWorkout,
		selectUserWorkoutExercises: (state) => state.userWorkoutExercises,
		selectUserExercises: (state) => state.userExercises,
	},
});

export const {
	setUserExercises,
	setUserWorkout,
	finishWorkout,
	setUserWorkoutExercises,
	setUserWorkoutTime,
} = workoutSlice.actions;
export const { selectUserWorkout, selectUserWorkoutExercises, selectUserExercises } = workoutSlice.selectors;
export const workoutReducer = workoutSlice.reducer;
