import { jwtDecode } from 'jwt-decode';
import { getUser } from '../api';
import { loginUser } from '../api/user/login-user';

export const authorize = async (authEmail, authPassword) => {
	const { token, message } = await loginUser(authEmail, authPassword);

	if (message) {
		return {
			error: message,
			res: null,
		};
	}

	localStorage.setItem('token', JSON.stringify(token));

	return {
		error: null,
		res: token,
	};
};
