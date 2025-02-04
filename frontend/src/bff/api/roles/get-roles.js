export const getRoles = async () =>
	fetch(`http://localhost:7001/api/roles`).then((loadedUser) => loadedUser.json());
