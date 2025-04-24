export const addRole = ({ name }) =>
	fetch(`${process.env.REACT_APP_API_URL}/api/roles`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			name,
		}),
	}).then((loadedRole) => loadedRole.json());
