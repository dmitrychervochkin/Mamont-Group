export const checkUser = async (token) =>
	fetch(`http://localhost:7001/api/users/auth`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
	}).then((loadedUsers) => loadedUsers.json());
