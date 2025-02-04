import { getUsers, getWorkouts } from '../api';
import { getWorkoutExercises } from '../api/workouts/get-workout-exercises';

export const fetchWorkoutExercises = async (workoutId) => {
	let workoutExercises = await getWorkoutExercises(workoutId);

	return {
		error: null,
		res: workoutExercises,
	};
};
