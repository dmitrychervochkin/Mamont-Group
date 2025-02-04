export const updateUser = ({ id, userRole }) =>
	fetch(`http://localhost:7001/api/users/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			role_id: userRole,
		}),
	}).then((loadedUser) => loadedUser.json());
