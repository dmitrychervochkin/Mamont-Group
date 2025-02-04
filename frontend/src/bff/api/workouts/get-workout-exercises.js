import { transformWorkouts } from '../../transformers';
import { transformWorkoutExercises } from '../../transformers/transform-workout-exercises';

export const getWorkoutExercises = async (workoutId) =>
	fetch(`http://localhost:7001/api/workout_exercises?workout_id=${workoutId}`)
		.then((loadedWorkoutExercises) => loadedWorkoutExercises.json())
		.then(
			(loadedWorkoutExercises) =>
				loadedWorkoutExercises && loadedWorkoutExercises.map(transformWorkoutExercises),
		);
