export const addCalendarTypeEvent = (muscleGroupId, calendarEventId) =>
	fetch('http://localhost:7001/api/calendar_type_events', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			muscleGroupId: muscleGroupId,
			calendarEventId: calendarEventId,
		}),
	}).then((data) => data.json());
