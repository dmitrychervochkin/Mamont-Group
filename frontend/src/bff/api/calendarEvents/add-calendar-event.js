export const addCalendarEvent = (calendarEventData) =>
	fetch(`${process.env.REACT_APP_API_URL}/api/calendar_events`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			date: calendarEventData.date,
			name: calendarEventData.name,
			complexity: calendarEventData.complexity,
			patternId: calendarEventData.patternId,
			userId: calendarEventData.userId,
		}),
	}).then((data) => data.json());
