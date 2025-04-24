export const deleteRole = (id) =>
	fetch(`${process.env.REACT_APP_API_URL}/api/roles/${id}`, {
		method: 'DELETE',
	});
