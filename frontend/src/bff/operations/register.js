import { getUser, addUser } from '../api';
import { jwtDecode } from 'jwt-decode';

export const register = async (regEmail, regLogin, regPassword) => {
	const { token, message } = await addUser(regLogin, regEmail, regPassword);

	if (message) {
		return {
			error: message,
			res: null,
		};
	}

	localStorage.setItem('token', token);

	return {
		error: null,
		res: token,
	};
};
