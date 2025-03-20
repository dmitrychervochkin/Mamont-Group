import { deleteMuscleGroup, deleteType } from '../api';

export const removeMuscleGroup = async (id) => {
	const userToken = localStorage.getItem('token');

	await deleteMuscleGroup(id, userToken);

	return {
		error: null,
		res: true,
	};
};
