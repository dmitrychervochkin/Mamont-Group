export const updatePassword = (email, login, password) =>
	fetch(`http://localhost:7001/api/users/update_password`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			email,
			login,
			password,
		}),
	}).then((loadedUser) => loadedUser.json());
