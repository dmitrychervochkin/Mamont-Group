import { updateUser } from '../api';

export const saveUser = async (userData) => {
	const savedUser = await updateUser(userData);

	return {
		error: null,
		res: savedUser,
	};
};
