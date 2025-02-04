import { transformUsers } from '../../transformers';

export const getUsers = async () =>
	fetch(`http://localhost:7001/api/users`)
		.then((loadedUsers) => loadedUsers.json())
		.then((loadedUsers) => loadedUsers && loadedUsers.map(transformUsers));
