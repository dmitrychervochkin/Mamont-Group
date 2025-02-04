import { deleteType } from '../api';

export const removeType = async (id) => {
	const userToken = localStorage.getItem('token');

	await deleteType(id, userToken);

	return {
		error: null,
		res: true,
	};
};
