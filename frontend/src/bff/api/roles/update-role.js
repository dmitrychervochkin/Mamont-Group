export const updateRole = ({ id, name }) =>
	fetch(`http://localhost:7001/api/roles/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			name,
		}),
	}).then((loadedRole) => loadedRole.json());
