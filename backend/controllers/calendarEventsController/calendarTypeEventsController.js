const ApiError = require('../../error/ApiError');
const { CalendarEvents, CalendarTypeEvents } = require('../../models/models');

class CalendarEventsController {
	async create(req, res, next) {
		try {
			const { typeId, calendarEventId } = req.body;

			console.log(typeId, calendarEventId);

			const calendarTypeEvent = await CalendarTypeEvents.create({
				type_id: typeId,
				calendar_event_id: calendarEventId,
			});

			return res.json(calendarTypeEvent);
		} catch (err) {
			return next(ApiError.badRequest(err.message));
		}
	}
	async getAll(req, res, next) {
		try {
			let { calendar_event_id } = req.query;

			const calendarEvents = await CalendarTypeEvents.findAll({ where: { calendar_event_id } });

			return res.json(calendarEvents);
		} catch (err) {
			return next(ApiError.badRequest(err.message));
		}
	}
	async delete(req, res) {
		const { id } = req.params;

		const types = await CalendarTypeEvents.destroy({
			where: { id },
		});

		return res.json(true);
	}
	async update(req, res) {
		const { id } = req.params;
		const { name } = req.body;
		console.log(req);
		const options = { where: { id }, returning: true };
		const [count, calendarEvent] = await CalendarTypeEvents.update({ name }, options);

		return res.json(calendarEvent);
	}
}

module.exports = new CalendarEventsController();
