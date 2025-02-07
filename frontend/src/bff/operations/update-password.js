import { jwtDecode } from 'jwt-decode';
import { getUser } from '../api';
import { loginUser } from '../api/user/login-user';

export const updatePassword = async (authEmail, authLogin, authPassword) => {
    console.log(authEmail, authLogin, authPassword)
	const { token, message } = await updatePassword(authEmail, authLogin, authPassword);

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
