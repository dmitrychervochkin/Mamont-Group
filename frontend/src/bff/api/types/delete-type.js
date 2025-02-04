export const deleteType = (id, token) =>
	fetch(`http://localhost:7001/api/types/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
	});
