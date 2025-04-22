export const deleteWorkout = (id, token) =>
	fetch(`${REACT_APP_API_URL}/api/workout/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
	});
