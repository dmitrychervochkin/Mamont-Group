import { deleteExercise, deleteUser, deleteWorkout } from '../api';

export const removeWorkout = async (id) => {
	// const accessRoles = [ROLE.ADMIN];
	const userToken = localStorage.getItem('token');

	await deleteWorkout(id, userToken);

	return {
		error: null,
		res: true,
	};
};
