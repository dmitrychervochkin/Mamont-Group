import { addType, addUserExercises, addWorkout, updateType } from '../api';
import { saveExercise } from './save-exercise';
import { saveUserExercises } from './save-user-exercises';
import { saveWorkoutExercises } from './save-workout-exercises';

export const saveWorkout = async (newWorkoutData, newUserExercisesData, newWorkoutExercisesData) => {
	const userToken = localStorage.getItem('token');

	let savedWorkout;
	let savedUserExercises;
	if (newWorkoutData.id === undefined) {
		savedWorkout = await addWorkout(newWorkoutData, userToken);
		savedUserExercises = await Promise.all(
			newUserExercisesData.map((item) =>
				saveUserExercises(item, newWorkoutExercisesData, savedWorkout.id),
			),
		);
	} else {
		// : await updateWorkout(newWorkoutData, userToken);
	}

	return {
		error: null,
		res: savedWorkout,
	};
};
