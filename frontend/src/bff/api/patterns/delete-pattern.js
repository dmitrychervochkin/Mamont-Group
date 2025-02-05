export const deletePattern = (id, token) =>
	fetch(`http://localhost:7001/api/patterns/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
	});
