import { getUserExercises, getUsers, getWorkouts } from '../api';
import { getWorkoutExercises } from '../api/workouts/get-workout-exercises';

export const fetchUserExercises = async (workoutId) => {
	let userExercises = await getUserExercises(workoutId);



	return {
		error: null,
		res: userExercises,
	};
};
