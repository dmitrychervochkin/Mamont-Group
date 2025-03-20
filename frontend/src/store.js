import { configureStore } from '@reduxjs/toolkit';

import {
	appReducer,
	exerciseReducer,
	exercisesReducer,
	modalReducer,
	muscleGroupsReducer,
	userReducer,
	workoutReducer,
} from './reducers';

export const store = configureStore({
	reducer: {
		user: userReducer,
		app: appReducer,
		workout: workoutReducer,
		exercise: exerciseReducer,
		exercises: exercisesReducer,
		muscleGroups: muscleGroupsReducer,
		modal: modalReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
