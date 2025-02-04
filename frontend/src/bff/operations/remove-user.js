import { deleteUser } from "../api";

export const removeUser = async (id) => {
	// const accessRoles = [ROLE.ADMIN];
	const userToken = localStorage.getItem('token');

	await deleteUser(id, userToken);

	return {
		error: null,
		res: true,
	};
};
