export const addUser = (login, email, password) =>
	fetch(`${process.env.REACT_APP_API_URL}api/users/registration`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			email,
			login,
			password,
		}),
	}).then((createdUser) => createdUser.json());
