import { getRoles } from '../api';

export const fetchRoles = async () => {
	const roles = await getRoles();

	return {
		error: null,
		res: roles,
	};
};
