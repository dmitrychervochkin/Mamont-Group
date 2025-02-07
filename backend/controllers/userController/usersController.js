const ApiError = require('../../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users, Workout, Roles } = require('../../models/models');
const { where } = require('sequelize');

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

			const candidate = await Users.findOne({ where: { email } });
			const userRole = await Roles.findOne({ where: { name: 'USER' } });

			if (candidate) {
				return next(ApiError.badRequest(`Пользователь с таким email "${email}" уже существует!`));
			}

			const hashPassword = await bcrypt.hash(password, 5);
			const { dataValues } = await Users.create({
				login,
				email,
				password: hashPassword,
				role_id: userRole.id,
			});

			const token = generateJwt(
				dataValues.id,
				dataValues.email,
				dataValues.role_id,
				dataValues.login,
				dataValues.created_at,
			);

			return res.json({ token });
		} catch (err) {
			return next(ApiError.badRequest('Некорректные данные при регистрации в системе!'));
		}
	}
	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const data = await Users.findOne({
				where: { email },
			});

			if (!data) {
				return next(ApiError.badRequest('Пользователь не найден!'));
			}

			const { dataValues } = data;

			let comparePassword = bcrypt.compareSync(password, dataValues.password);

			if (!comparePassword) {
				return next(ApiError.badRequest('Указан неверный пароль!'));
			}

			const token = generateJwt(
				dataValues.id,
				dataValues.email,
				dataValues.role_id,
				dataValues.login,
				dataValues.created_at,
			);

			return res.json({ token });
		} catch (err) {
			return next(ApiError.badRequest('Некорректные данные при входе в систему!'));
		}
	}
	async check(req, res, next) {
		const token = generateJwt(
			req.user.id,
			req.user.email,
			req.user.roleId,
			req.user.login,
			req.user.createdAt,
		);

		return res.json({ token });
	}
	async getAll(req, res) {
		const users = await Users.findAll();
		const usersFilter = users.map((user) => ({
			id: user.id,
			email: user.email,
			login: user.login,
			created_at: user.created_at,
			role_id: user.role_id,
		}));

		return res.json(usersFilter);
	}
	async getOne(req, res) {
		try {
			const { id } = req.params;
			const user = await Users.findOne({
				where: { id },
			});
			const userFilter = {
				id: user.id,
				email: user.email,
				login: user.login,
				created_at: user.created_at,
				role_id: user.role_id,
			};

			return res.json(userFilter);
		} catch (err) {
			return res.status(500).json({ message: 'Пользователь не найден!' });
		}
	}
	async delete(req, res) {
		const { id } = req.params;

		const types = await Users.destroy({
			where: { id },
		});

		return res.json(true);
	}
	async update(req, res) {
		const { id } = req.params;
		const data = req.body;
		const options = { where: { id }, returning: true };
		const [count, type] = await Users.update(data, options);

		return res.json(type);
	}
	async updatePassword(req, res, next) {
		const { login, email, password } = req.body;
		const data = await Users.findOne({
			where: { email, login },
		});

		if (!data) {
			return next(ApiError.badRequest('Пользователь не найден!'));
		}
		const options = { where: { email }, returning: true };
		const [count, user] = await Users.update(password, options);

		console.log(user)

		// const { dataValues } = data;

		// let comparePassword = bcrypt.compareSync(password, dataValues.password);

		// if (!comparePassword) {
		// 	return next(ApiError.badRequest('Указан неверный пароль!'));
		// }

		// const token = generateJwt(
		// 	dataValues.id,
		// 	dataValues.email,
		// 	dataValues.role_id,
		// 	dataValues.login,
		// 	dataValues.created_at,
		// );

		return res.json({ token });
	}
}

module.exports = new UsersController();
