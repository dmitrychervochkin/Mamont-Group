import { transformCalendarEvents, transformCalendarTypeEvent, transformExercises } from '../../transformers';

export const getCalendarTypeEvents = async (calendarEventId) =>
	fetch(`http://localhost:7001/api/calendar_type_events?calendar_event_id=${calendarEventId}`)
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
		.then((data) => data && data.map(transformCalendarTypeEvent));
