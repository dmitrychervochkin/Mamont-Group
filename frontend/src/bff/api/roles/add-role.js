export const addRole = ({ name }) =>
	fetch(`http://localhost:7001/api/roles`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			name,
		}),
	}).then((loadedRole) => loadedRole.json());
