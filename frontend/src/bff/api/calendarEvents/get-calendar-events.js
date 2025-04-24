import { transformCalendarEvents, transformExercises } from '../../transformers';

export const getCalendarEvents = async (userId) =>
	fetch(`${process.env.REACT_APP_API_URL}/api/calendar_events?user_id=${userId}`)
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
		.then((data) => (data.message ? data : data && data.map(transformCalendarEvents)));
