import { transformWorkouts, transforPatternmWorkoutExercises } from '../../transformers';
import { transformWorkoutExercises } from '../../transformers/transform-workout-exercises';

export const getPatternWorkoutExercises = async (patternId) =>
	fetch(`${process.env.REACT_APP_API_URL}/api/pattern_workout_exercises?pattern_id=${patternId}`)
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
		.then((data) => data.json())
		.then((data) => data && data.map(transforPatternmWorkoutExercises));
