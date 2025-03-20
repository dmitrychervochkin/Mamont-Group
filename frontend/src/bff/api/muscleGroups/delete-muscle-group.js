export const deleteMuscleGroup = (id, token) =>
	fetch(`http://localhost:7001/api/muscle_groups/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
	});
