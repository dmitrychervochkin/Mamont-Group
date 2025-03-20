export const updateMuscleGroup = ({ id, name }, token) =>
	fetch(`http://localhost:7001/api/muscle_groups/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
		body: JSON.stringify({
			name,
		}),
	}).then((data) => data.json());
