import { transformUserExercises, transformWorkouts } from '../../transformers';

export const getUserExercises = async (workoutId) =>
	fetch(`http://localhost:7001/api/user_exercises?workout_id=${workoutId}`)
		.then((loadedUserExercises) => loadedUserExercises.json())
		.then(
			(loadedUserExercises) => loadedUserExercises && loadedUserExercises.map(transformUserExercises),
		);
