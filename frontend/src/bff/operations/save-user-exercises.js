import { addType, addUserExercises, addWorkout, addWorkoutExercises, updateType } from '../api';
import { saveWorkoutExercises } from './save-workout-exercises';

export const saveUserExercises = async (newExerciseData, newWorkoutExercisesData, workoutId) => {
	const userToken = localStorage.getItem('token');

	let savedUserExercises = await addUserExercises(newExerciseData, workoutId, userToken);
	let savedWorkoutExercises = [];

	for (let item in newWorkoutExercisesData) {
		if (newExerciseData.id === newWorkoutExercisesData[item].userExerciseId) {
			savedWorkoutExercises = await saveWorkoutExercises(
				newWorkoutExercisesData[item],
				savedUserExercises.id,
				workoutId,
			);
		}
	}

	return {
		error: null,
		res: savedUserExercises,
	};
};
