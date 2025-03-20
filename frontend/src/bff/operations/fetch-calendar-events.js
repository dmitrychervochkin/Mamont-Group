import { getCalendarEvents, getCalendarTypeEvents, getExerciseInfo, getExercises } from '../api';

export const fetchCalendarEvents = async (userId) => {
	let calendarEvents = await getCalendarEvents(userId);

	if (calendarEvents.message) {
		return {
			error: calendarEvents.message,
			res: null,
		};
	}

	return {
		error: null,
		res: calendarEvents,
	};
};
