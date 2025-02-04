export const deletePattern = (id, token) =>
	fetch(`http://localhost:7001/api/pattern/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
	});
