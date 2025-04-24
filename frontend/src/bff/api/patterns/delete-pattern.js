export const deletePattern = (id, token) =>
	fetch(`${process.env.REACT_APP_API_URL}/api/patterns/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
	});
