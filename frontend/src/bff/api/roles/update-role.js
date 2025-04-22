export const updateRole = ({ id, name }) =>
	fetch(`${REACT_APP_API_URL}/api/roles/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			name,
		}),
	}).then((loadedRole) => loadedRole.json());
