import { jwtDecode } from 'jwt-decode';
import { getUser, updatePassword } from '../api';
import { loginUser } from '../api/user/login-user';

export const resetPassword = async (authEmail, authLogin, authPassword) => {
	const { token, message, success } = await updatePassword(authEmail, authLogin, authPassword);

	if (message && !success) {
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
