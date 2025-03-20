export const addMuscleGroup = ({ name }, token) =>
	fetch(`http://localhost:7001/api/muscle_groups`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
		body: JSON.stringify({
			name,
		}),
	}).then((data) => data.json());
