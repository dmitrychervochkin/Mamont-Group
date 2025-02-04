export const loginUser = (email, password) =>
	fetch('http://localhost:7001/api/users/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			email,
			password,
		}),
	}).then((createdUser) => createdUser.json());
