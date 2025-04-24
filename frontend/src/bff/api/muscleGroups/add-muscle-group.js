export const addMuscleGroup = ({ name }, token) =>
	fetch(`${process.env.REACT_APP_API_URL}api/muscle_groups`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
		body: JSON.stringify({
			name,
		}),
	}).then((data) => data.json());
