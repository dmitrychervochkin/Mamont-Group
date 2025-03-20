import { jwtDecode } from 'jwt-decode';
import { checkUser, getUser } from '../api';
import { userLogout } from '../../reducers';
import { useDispatch, useSelector } from 'react-redux';

export const check = async () => {
	const userToken = localStorage.getItem('token');
	const { token, message } = await checkUser(userToken);

	if (message) {
		localStorage.removeItem('token');
	}
	if (token === undefined) {
		return token;
	}

	localStorage.setItem('token', JSON.stringify(token));

	return {
		error: null,
		res: token,
	};
};
