import { transformCalendarEvents, transformCalendarTypeEvent, transformExercises } from '../../transformers';

export const getCalendarTypeEvents = async (calendarEventId) =>
	fetch(`http://localhost:7001/api/calendar_type_events?calendar_event_id=${calendarEventId}`)
		.then((data) => data.json())
		.then((data) => data && data.map(transformCalendarTypeEvent));
