import { addRole, updateRole } from '../api';

export const saveRole = async (newRoleData) => {
	const savedRole =
		newRoleData.id === undefined ? await addRole(newRoleData) : await updateRole(newRoleData);

	return {
		error: null,
		res: savedRole,
	};
};
