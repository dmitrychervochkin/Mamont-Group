import { transformWorkouts } from '../../transformers';
import { transformWorkoutExercises } from '../../transformers/transform-workout-exercises';

export const getWorkoutExercises = async (workoutId) =>
	fetch(`${process.env.REACT_APP_API_URL}api/workout_exercises?workout_id=${workoutId}`)
		.catch((res) => {
			if (res.ok) {
				return res;
			}

			const error =
				res.status === 404
					? 'Такая страница не существует'
					: 'Что-то пошло не так. Попробуйте ещё раз позднее.';
			return Promise.reject(error);
		})
		.then((loadedWorkoutExercises) => loadedWorkoutExercises.json())
		.then(
			(loadedWorkoutExercises) =>
				loadedWorkoutExercises && loadedWorkoutExercises.map(transformWorkoutExercises),
		);
