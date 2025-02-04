export const transformWorkouts = (dbWorkouts) => ({
	id: dbWorkouts.id,
	name: dbWorkouts.name,
	time: dbWorkouts.time,
	date: dbWorkouts.date,
	userId: dbWorkouts.user_id,
});
