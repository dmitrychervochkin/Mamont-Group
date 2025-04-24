import { sanitizeString } from '../../../utils';

export const updatePassword = (email, login, password) =>
	fetch(`${process.env.REACT_APP_API_URL}api/users/reset_password`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			email: sanitizeString(email),
			login: sanitizeString(login),
			password: sanitizeString(password),
		}),
	}).then((loadedUser) => loadedUser.json());
