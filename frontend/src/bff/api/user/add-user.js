export const addUser = (login, email, password) =>
	fetch('http://localhost:7001/api/users/registration', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			email,
			login,
			password,
		}),
	})
		.then((createdUser) => createdUser.json())
