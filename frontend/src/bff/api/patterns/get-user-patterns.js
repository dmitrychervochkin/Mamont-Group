import { transformUserPattern, transformWorkouts } from '../../transformers';

export const getUserPatterns = async (userId, limit, page) =>
	fetch(`${REACT_APP_API_URL}/api/user_patterns?user_id=${userId}&limit=${limit}&page=${page}`)
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
		.then(({ count, rows }) => ({ count, rows: rows && rows.map(transformUserPattern) }));
