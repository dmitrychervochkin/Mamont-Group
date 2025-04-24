import { transformUserExercises, transformWorkouts } from '../../transformers';

export const getUserExercises = async (workoutId) =>
	fetch(`${process.env.REACT_APP_API_URL}api/user_exercises?workout_id=${workoutId}`)
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
		.then((loadedUserExercises) => loadedUserExercises.json())
		.then(
			(loadedUserExercises) => loadedUserExercises && loadedUserExercises.map(transformUserExercises),
		);
