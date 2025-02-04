export const transformUsers = (dbUsers) => ({
	id: dbUsers.id,
	login: dbUsers.login,
	email: dbUsers.email,
	createdAt: dbUsers.created_at,
	roleId: dbUsers.role_id,
});
