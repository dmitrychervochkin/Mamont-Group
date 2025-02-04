import { deleteRole } from "../api";

export const removeRole = async (id) => {
	// const accessRoles = [ROLE.ADMIN];

	await deleteRole(id);

	return {
		error: null,
		res: true,
	};
};
