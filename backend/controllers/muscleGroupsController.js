const { MuscleGroups } = require('../models/models');
const ApiError = require('../error/ApiError');

class MuscleGroupsController {
	async create(req, res, next) {
		try {
			const { name } = req.body;
			if (!name) {
				return next(ApiError.badRequest('Имя типа обязательно'));
			}
			const type = await MuscleGroups.create({ name });
			return res.json(type);
		} catch (error) {
			next(ApiError.internal('Ошибка при создании типа'));
		}
	}

	async getAll(req, res, next) {
		try {
			const muscleGroups = await MuscleGroups.findAll();
			return res.json(muscleGroups);
		} catch (error) {
			next(ApiError.internal('Ошибка при получении типов'));
		}
	}

	async delete(req, res, next) {
		try {
			const { id } = req.params;
			if (!id) {
				return next(ApiError.badRequest('ID обязателен'));
			}

			const deletedCount = await MuscleGroups.destroy({ where: { id } });

			if (!deletedCount) {
				return next(ApiError.notFound('Тип не найден'));
			}

			return res.json({ message: 'Тип успешно удален' });
		} catch (error) {
			next(ApiError.internal('Ошибка при удалении типа'));
		}
	}

	async update(req, res, next) {
		try {
			const { id } = req.params;
			const { name } = req.body;

			if (!id || !name) {
				return next(ApiError.badRequest('ID и имя обязательны'));
			}

			const [count, updatedRows] = await MuscleGroups.update(
				{ name },
				{ where: { id }, returning: true },
			);

			if (count === 0) {
				return next(ApiError.notFound('Тип не найден'));
			}

			return res.json(updatedRows[0]);
		} catch (error) {
			next(ApiError.internal('Ошибка при обновлении типа'));
		}
	}
}

module.exports = new MuscleGroupsController();
