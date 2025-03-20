const { Roles } = require('../models/models');
const ApiError = require('../error/ApiError');

class RolesController {
	async create(req, res, next) {
		try {
			const { name } = req.body;
			if (!name) {
				return next(ApiError.badRequest('Имя роли обязательно'));
			}

			const role = await Roles.create({ name });
			return res.json(role);
		} catch (error) {
			next(ApiError.internal('Ошибка при создании роли'));
		}
	}

	async getAll(req, res, next) {
		try {
			const roles = await Roles.findAll();
			return res.json(roles);
		} catch (error) {
			next(ApiError.internal('Ошибка при получении ролей'));
		}
	}

	async delete(req, res, next) {
		try {
			const { id } = req.params;
			if (!id) {
				return next(ApiError.badRequest('ID обязателен'));
			}

			const deletedCount = await Roles.destroy({ where: { id } });

			if (!deletedCount) {
				return next(ApiError.notFound('Роль не найдена'));
			}

			return res.json({ message: 'Роль успешно удалена' });
		} catch (error) {
			next(ApiError.internal('Ошибка при удалении роли'));
		}
	}

	async update(req, res, next) {
		try {
			const { id } = req.params;
			const { name } = req.body;

			if (!id || !name) {
				return next(ApiError.badRequest('ID и имя обязательны'));
			}

			const [count, updatedRows] = await Roles.update({ name }, { where: { id }, returning: true });

			if (count === 0) {
				return next(ApiError.notFound('Роль не найдена'));
			}

			return res.json(updatedRows[0]);
		} catch (error) {
			next(ApiError.internal('Ошибка при обновлении роли'));
		}
	}
}

module.exports = new RolesController();
