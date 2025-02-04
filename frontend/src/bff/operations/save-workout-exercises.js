import { addType, addWorkout, addWorkoutExercises, updateType } from '../api';

export const saveWorkoutExercises = async (newWorkoutExercisesData, userExerciseId, workoutId) => {
	const userToken = localStorage.getItem('token');

	let savedWorkoutExercises = await addWorkoutExercises(
		{
			exerciseId: newWorkoutExercisesData.exerciseId,
			userExerciseId: userExerciseId,
			workoutId: workoutId,
			reps: newWorkoutExercisesData.reps,
			set: newWorkoutExercisesData.set,
			weight: newWorkoutExercisesData.weight,
		},
		userToken,
	);

	return {
		error: null,
		res: savedWorkoutExercises,
	};
};
