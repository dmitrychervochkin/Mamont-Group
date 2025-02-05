import { transformExercises } from '../../transformers';

export const getExercises = async (currentType) =>
	fetch(`http://localhost:7001/api/exercises?type_id=${currentType}`)
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
		.then((loadedExercises) => loadedExercises.json())
		.then(({ count, rows }) => ({ count, rows: rows && rows.map(transformExercises) }));
