import { transformPatternExercises, transformUserExercises, transformWorkouts } from '../../transformers';

export const getPatternExercises = async (patternId) =>
	fetch(`${REACT_APP_API_URL}/api/pattern_exercises?pattern_id=${patternId}`)
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
		.then((data) => data && data.map(transformPatternExercises));
