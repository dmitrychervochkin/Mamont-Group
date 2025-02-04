export const deleteRole = (id) =>
	fetch(`http://localhost:7001/api/roles/${id}`, {
		method: 'DELETE',
	});
