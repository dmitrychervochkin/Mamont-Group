export const updateWorkout = ({ id, name }, token) =>
	fetch(`${REACT_APP_API_URL}/api/workout/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
		body: JSON.stringify({
			name,
		}),
	}).then((loadedType) => loadedType.json());
