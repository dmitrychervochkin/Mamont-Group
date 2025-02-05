import { getCalendarEvents, getCalendarTypeEvents, getExerciseInfo, getExercises } from '../api';

export const fetchCalendarTypeEvents = async (calendarEventId) => {
	let calendarTypeEvents = await getCalendarTypeEvents(calendarEventId);

	return {
		error: null,
		res: calendarTypeEvents,
	};
};
