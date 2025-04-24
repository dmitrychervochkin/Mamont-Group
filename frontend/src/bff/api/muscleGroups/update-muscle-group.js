export const updateMuscleGroup = ({ id, name }, token) =>
	fetch(`${process.env.REACT_APP_API_URL}api/muscle_groups/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
		body: JSON.stringify({
			name,
		}),
	}).then((data) => data.json());
