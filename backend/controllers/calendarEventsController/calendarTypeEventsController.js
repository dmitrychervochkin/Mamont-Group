const ApiError = require('../../error/ApiError');
const { CalendarTypeEvents } = require('../../models/models');

class CalendarTypeEventsController {
	async create(req, res, next) {
		try {
			const { muscleGroupId, calendarEventId } = req.body;

			if (!muscleGroupId || !calendarEventId) {
				return next(ApiError.badRequest('muscleGroupId и calendarEventId обязательны'));
			}

			const calendarTypeEvent = await CalendarTypeEvents.create({
				muscle_group_id: muscleGroupId,
				calendar_event_id: calendarEventId,
			});

			return res.json(calendarTypeEvent);
		} catch (err) {
			next(ApiError.badRequest('Ошибка при создании: ' + err.message));
		}
	}

	async getAll(req, res, next) {
		try {
			const { calendar_event_id } = req.query;

			if (!calendar_event_id) {
				return next(ApiError.badRequest('calendar_event_id обязателен'));
			}

			const calendarEvents = await CalendarTypeEvents.findAll({ where: { calendar_event_id } });

			return res.json(calendarEvents);
		} catch (err) {
			next(ApiError.internal('Ошибка при получении списка событий'));
		}
	}

	async delete(req, res, next) {
		try {
			const { id } = req.params;

			if (!id) {
				return next(ApiError.badRequest('ID обязателен'));
			}

			const event = await CalendarTypeEvents.findOne({ where: { id } });

			if (!event) {
				return next(ApiError.notFound('Событие не найдено'));
			}

			await CalendarTypeEvents.destroy({ where: { id } });

			return res.json({ message: 'Событие успешно удалено' });
		} catch (err) {
			next(ApiError.internal('Ошибка при удалении события'));
		}
	}

	async update(req, res, next) {
		try {
			const { id } = req.params;
			const { muscleGroupId, calendarEventId } = req.body;

			if (!id) {
				return next(ApiError.badRequest('ID обязателен'));
			}

			const event = await CalendarTypeEvents.findOne({ where: { id } });

			if (!event) {
				return next(ApiError.notFound('Событие не найдено'));
			}

			await event.update({ muscle_group_id: muscleGroupId, calendar_event_id: calendarEventId });

			return res.json(event);
		} catch (err) {
			next(ApiError.internal('Ошибка при обновлении события'));
		}
	}
}

module.exports = new CalendarTypeEventsController();
