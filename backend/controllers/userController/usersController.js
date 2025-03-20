const ApiError = require('../../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users, Roles } = require('../../models/models');

const generateJwt = (id, email, roleId, login, createdAt) => {
	return jwt.sign({ id, email, roleId, login, createdAt }, process.env.SECRET_KEY, {
		expiresIn: '1h',
	});
};

class UsersController {
	async registration(req, res, next) {
		try {
			const { email, login, password } = req.body;
			if (!email || !password) {
				return next(ApiError.badRequest('Некорректный email или пароль!'));
			}

			const existingUser = await Users.findOne({ where: { email } });
			if (existingUser) {
				return next(ApiError.badRequest(`Пользователь с email "${email}" уже существует!`));
			}

			const userRole = await Roles.findOne({ where: { name: 'USER' } });
			const hashPassword = await bcrypt.hash(password, 10);
			const newUser = await Users.create({
				login,
				email,
				password: hashPassword,
				role_id: userRole.id,
			});

			const token = generateJwt(
				newUser.id,
				newUser.email,
				newUser.role_id,
				newUser.login,
				newUser.createdAt,
			);
			return res.json({ token });
		} catch (error) {
			return next(ApiError.internal('Ошибка регистрации!'));
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const user = await Users.findOne({ where: { email } });
			if (!user) {
				return next(ApiError.badRequest('Пользователь не найден!'));
			}

			const isPasswordValid = await bcrypt.compare(password, user.password);
			if (!isPasswordValid) {
				return next(ApiError.badRequest('Неверный пароль!'));
			}

			const token = generateJwt(user.id, user.email, user.role_id, user.login, user.created_at);
			return res.json({ token });
		} catch (error) {
			return next(ApiError.internal('Ошибка входа!'));
		}
	}

	async check(req, res) {
		const token = generateJwt(
			req.user.id,
			req.user.email,
			req.user.roleId,
			req.user.login,
			req.user.created_at,
		);
		return res.json({ token });
	}

	async getAll(req, res) {
		const users = await Users.findAll({ attributes: ['id', 'email', 'login', 'created_at', 'role_id'] });
		return res.json(users);
	}

	async getOne(req, res, next) {
		try {
			const { id } = req.params;
			const user = await Users.findByPk(id, {
				attributes: ['id', 'email', 'login', 'createdAt', 'role_id'],
			});
			if (!user) {
				return next(ApiError.notFound('Пользователь не найден!'));
			}
			return res.json(user);
		} catch (error) {
			return next(ApiError.internal('Ошибка при получении пользователя!'));
		}
	}

	async delete(req, res, next) {
		try {
			const { id } = req.params;
			const deletedCount = await Users.destroy({ where: { id } });
			if (!deletedCount) {
				return next(ApiError.notFound('Пользователь не найден!'));
			}
			return res.json({ success: true });
		} catch (error) {
			return next(ApiError.internal('Ошибка при удалении пользователя!'));
		}
	}

	async update(req, res, next) {
		try {
			const { id } = req.params;
			const [updatedCount, updatedUsers] = await Users.update(req.body, {
				where: { id },
				returning: true,
			});
			if (!updatedCount) {
				return next(ApiError.notFound('Пользователь не найден!'));
			}
			return res.json(updatedUsers[0]);
		} catch (error) {
			return next(ApiError.internal('Ошибка при обновлении данных пользователя!'));
		}
	}

	async resetPassword(req, res, next) {
		try {
			const { email, login, password } = req.body;
			const user = await Users.findOne({ where: { email, login } });

			if (!user) {
				return next(ApiError.badRequest('Пользователь не найден!'));
			}

			const hashPassword = await bcrypt.hash(password, 10);

			const updatedUser = await Users.update(
				{ password: hashPassword },
				{ where: { email }, returning: true },
			);

			if (!updatedUser[0]) {
				return next(ApiError.internal('Не удалось обновить пароль.'));
			}

			const token = generateJwt(user.id, user.email, user.role_id, user.login, user.createdAt);

			return res.json({ token });
		} catch (err) {
			return next(ApiError.internal('Ошибка при обновлении пароля!'));
		}
	}
}

module.exports = new UsersController();
