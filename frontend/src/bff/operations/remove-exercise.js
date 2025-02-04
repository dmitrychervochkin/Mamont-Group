import { deleteExercise, deleteUser } from "../api";

export const removeExercise = async (id) => {
	// const accessRoles = [ROLE.ADMIN];
	const userToken = localStorage.getItem('token');

	await deleteExercise(id, userToken);

	return {
		error: null,
		res: true,
	};
};
