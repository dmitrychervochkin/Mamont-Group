export const deleteWorkout = (id, token) =>
	fetch(`http://localhost:7001/api/workout/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
	});
