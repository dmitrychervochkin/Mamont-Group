export const transformCalendarTypeEvent = (db) => ({
	id: db.id,
	typeId: db.type_id,
	calendarEventId: db.calendar_event_id,
});
