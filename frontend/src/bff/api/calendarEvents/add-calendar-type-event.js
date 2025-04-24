export const addCalendarTypeEvent = (muscleGroupId, calendarEventId) =>
	fetch(`${process.env.REACT_APP_API_URL}api/calendar_type_events`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			muscleGroupId: muscleGroupId,
			calendarEventId: calendarEventId,
		}),
	}).then((data) => data.json());
