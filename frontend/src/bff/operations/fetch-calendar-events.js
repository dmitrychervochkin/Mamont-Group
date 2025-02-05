import { getCalendarEvents, getCalendarTypeEvents, getExerciseInfo, getExercises } from '../api';

export const fetchCalendarEvents = async (userId) => {
	let calendarEvents = await getCalendarEvents(userId);

	return {
		error: null,
		res: calendarEvents,
	};
};
