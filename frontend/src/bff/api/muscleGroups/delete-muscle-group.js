export const deleteMuscleGroup = (id, token) =>
	fetch(`${process.env.REACT_APP_API_URL}api/muscle_groups/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
	});
