const ApiError = require('../../error/ApiError');
const { CalendarEvents } = require('../../models/models');

class CalendarEventsController {
	async create(req, res, next) {
		try {
			const { name, patternId, userId, date, complexity } = req.body;

			if (!name || !userId || !date) {
				return next(ApiError.badRequest('name, userId и date обязательны'));
			}

			const calendarEvent = await CalendarEvents.create({
				name,
				date,
				complexity,
				pattern_id: patternId,
				user_id: userId,
			});

			return res.json(calendarEvent);
		} catch (err) {
			next(ApiError.badRequest('Ошибка при создании: ' + err.message));
		}
	}

	async getAll(req, res, next) {
		try {
			const { user_id } = req.query;

			if (!user_id) {
				return next(ApiError.badRequest('userId обязателен'));
			}

			const calendarEvents = await CalendarEvents.findAll({ where: { user_id } });
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

			const event = await CalendarEvents.findOne({ where: { id } });

			if (!event) {
				return next(ApiError.notFound('Событие не найдено'));
			}

			await CalendarEvents.destroy({ where: { id } });

			return res.json({ message: 'Событие успешно удалено' });
		} catch (err) {
			next(ApiError.internal('Ошибка при удалении события'));
		}
	}

	async update(req, res, next) {
		try {
			const { id } = req.params;
			const { name, date, complexity } = req.body;

			if (!id) {
				return next(ApiError.badRequest('ID обязателен'));
			}

			const event = await CalendarEvents.findOne({ where: { id } });

			if (!event) {
				return next(ApiError.notFound('Событие не найдено'));
			}

			const updatedEvent = await event.update({ name, date, complexity });

			return res.json(updatedEvent);
		} catch (err) {
			next(ApiError.internal('Ошибка при обновлении события'));
		}
	}
}

module.exports = new CalendarEventsController();
