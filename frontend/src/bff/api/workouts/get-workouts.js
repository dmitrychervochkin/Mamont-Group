import { transformWorkouts } from '../../transformers';

export const getWorkouts = async (userId, page, limit) =>
	fetch(`http://localhost:7001/api/workout?user_id=${userId}&page=${page}&limit=${limit}`)
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
		.then((loadedWorkouts) => loadedWorkouts.json())
		.then(({ count, rows }) => ({ count, rows: rows && rows.map(transformWorkouts) }));
