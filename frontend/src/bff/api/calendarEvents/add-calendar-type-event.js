export const addCalendarTypeEvent = (typeId, calendarEventId) =>
	fetch('http://localhost:7001/api/calendar_type_events', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			typeId: typeId,
			calendarEventId: calendarEventId,
		}),
	}).then((data) => data.json());
