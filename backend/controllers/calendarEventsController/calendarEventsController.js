const ApiError = require('../../error/ApiError');
const { CalendarEvents } = require('../../models/models');

class CalendarEventsController {
	async create(req, res, next) {
		try {
			const { name, patternId, date, complexity } = req.body;

			const calendarEvent = await CalendarEvents.create({
				name,
				date,
				complexity,
				pattern_id: patternId,
			});

			return res.json(calendarEvent);
		} catch (err) {
			return next(ApiError.badRequest(err.message));
		}
	}
	async getAll(req, res) {
		const calendarEvents = await CalendarEvents.findAll();
		return res.json(calendarEvents);
	}
	async delete(req, res) {
		const { id } = req.params;

		const types = await CalendarEvents.destroy({
			where: { id },
		});

		return res.json(true);
	}
	async update(req, res) {
		const { id } = req.params;
		const { name } = req.body;
		console.log(req);
		const options = { where: { id }, returning: true };
		const [count, calendarEvent] = await CalendarEvents.update({ name }, options);

		return res.json(calendarEvent);
	}
}

module.exports = new CalendarEventsController();
