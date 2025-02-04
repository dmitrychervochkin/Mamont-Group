import { getUsers } from '../api';

export const fetchUsers = async () => {
	let users = await getUsers();

	if (users) {
		users = users.sort((a, b) => a.id > b.id);
	}

	return {
		error: null,
		res: users,
	};
};
