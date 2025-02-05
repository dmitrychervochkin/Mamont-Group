import { transformCalendarEvents, transformExercises } from '../../transformers';

export const getCalendarEvents = async (userId) =>
	fetch(`http://localhost:7001/api/calendar_events?user_id=${userId}`)
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
		.then((data) => data && data.map(transformCalendarEvents));
