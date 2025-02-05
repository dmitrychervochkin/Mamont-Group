export const transformCalendarEvents = (db) => ({
	id: db.id,
	name: db.name,
	userId: db.user_id,
	patternId: db.pattern_id,
	date: db.date,
	complexity: db.complexity,
});
