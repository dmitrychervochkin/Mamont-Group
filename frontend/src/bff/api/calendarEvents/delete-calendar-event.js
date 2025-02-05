export const deleteCalendarEvent = (id, token) =>
	fetch(`http://localhost:7001/api/calendar_events/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
	});
