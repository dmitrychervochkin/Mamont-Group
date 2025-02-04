export const deleteUser = (id, token) =>
	fetch(`http://localhost:7001/api/users/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
	});
