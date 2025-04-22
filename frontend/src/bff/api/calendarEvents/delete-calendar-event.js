export const deleteCalendarEvent = (id, token) =>
	fetch(`${REACT_APP_API_URL}/api/calendar_events/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
	});
