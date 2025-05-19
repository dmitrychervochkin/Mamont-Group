import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	wasLogout: false,
	error: {
		isError: false,
		message: null,
	},
	progressBar: {
		isLoading: false,
	},
	workoutTimer: {
		start: false,
		isAddPattern: false,
		isBreak: false,
		breakTime: 120,
		isTimerEditing: false,
	},
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		logout: (state, action) => {
			return { ...state, wasLogout: !state.wasLogout };
		},
		setError: (state, action) => {
			return { ...state, error: { message: action.payload, isError: true } };
		},
		resetError: (state, action) => {
			return { ...state, error: initialState.error };
		},
		startWorkout: (state, action) => {
			return { ...state, workoutTimer: { ...state.workoutTimer, start: true } };
		},
		addPattern: (state, action) => {
			return { ...state, workoutTimer: { ...state.workoutTimer, start: true, isAddPattern: true } };
		},
		timerEditing: (state, action) => {
			return {
				...state,
				workoutTimer: { ...state.workoutTimer, isTimerEditing: !state.workoutTimer.isTimerEditing },
			};
		},
		startBreak: (state, action) => {
			return {
				...state,
				workoutTimer: {
					...state.workoutTimer,
					isBreak: true,
					breakTime:
						action.payload === undefined ? initialState.workoutTimer.breakTime : action.payload,
				},
			};
		},
		stopBreak: (state, action) => {
			return {
				...state,
				workoutTimer: { ...state.workoutTimer, isBreak: false },
			};
		},
		stopWorkout: (state, action) => {
			return { ...state, workoutTimer: { start: false } };
		},
	},
	selectors: {
		selectStartWorkout: (state) => state.workoutTimer.start,
		selectIsAddPattern: (state) => state.workoutTimer.isAddPattern,
		selectIsBreak: (state) => state.workoutTimer.isBreak,
		selectBreakTime: (state) => state.workoutTimer.breakTime,
		selectIsTimerEditing: (state) => state.workoutTimer.isTimerEditing,
		selectIsError: (state) => state.error.isError,
		selectErrorMessage: (state) => state.error.message,
	},
});

export const {
	logout,
	startWorkout,
	stopWorkout,
	startBreak,
	stopBreak,
	timerEditing,
	setError,
	resetError,
	addPattern,
} = appSlice.actions;
export const {
	selectWorkoutTime,
	selectStartWorkout,
	selectIsBreak,
	selectBreakTime,
	selectIsTimerEditing,
	selectIsError,
	selectIsAddPattern,
	selectErrorMessage,
} = appSlice.selectors;
export const appReducer = appSlice.reducer;
