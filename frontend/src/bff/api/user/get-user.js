export const getUser = async (email) =>
	fetch(`http://localhost:7001/api/users/${email}`).then((loadedUser) => loadedUser.json());
