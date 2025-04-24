export const checkUser = async (token) =>
	fetch(`${process.env.REACT_APP_API_URL}api/users/auth`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
	}).then((loadedUsers) => loadedUsers.json());
