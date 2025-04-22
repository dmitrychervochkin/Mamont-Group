export const deleteRole = (id) =>
	fetch(`${REACT_APP_API_URL}/api/roles/${id}`, {
		method: 'DELETE',
	});
