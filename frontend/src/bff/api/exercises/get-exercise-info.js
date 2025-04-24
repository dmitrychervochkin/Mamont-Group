import { transformExerciseInfo, transformExercises } from '../../transformers';

export const getExerciseInfo = async (exerciseId, type) =>
	fetch(`${process.env.REACT_APP_API_URL}api/exercise_info?exercise_id=${exerciseId}&type=${type}`)
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
		.then((loadedExerciseInfo) => loadedExerciseInfo.json())
		.then((loadedExerciseInfo) => loadedExerciseInfo && loadedExerciseInfo.map(transformExerciseInfo));
