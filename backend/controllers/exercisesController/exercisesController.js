const ApiError = require('../../error/ApiError');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const { Exercises, ExerciseInfo } = require('../../models/models');

class ExercisesController {
	async create(req, res, next) {
		try {
			let { name, muscleGroupId, userId, description } = req.body;
			// const { img } = req.files; // Раскомментируй, если используешь загрузку файлов
			// let fileName = uuid.v4() + ".jpg";

			if (!name || !userId) {
				return next(ApiError.badRequest('Имя и userId обязательны'));
			}

			const existingExercise = await Exercises.findOne({
				where: { name, user_id: userId },
			});

			// if (!existingExercise && img) {
			// 	img.mv(path.resolve(__dirname, "..", "static", fileName));
			// }

			const exercise =
				existingExercise?.user_id === userId
					? existingExercise
					: await Exercises.create({
							name,
							muscle_group_id: muscleGroupId,
							user_id: userId,
							description,
					  });

			return res.json(exercise);
		} catch (err) {
			next(ApiError.badRequest('Ошибка при создании упражнения: ' + err.message));
		}
	}

	async getAll(req, res, next) {
		try {
			let { muscle_group_id, user_id, limit, page } = req.query;
			page = page || 1;
			limit = limit || 20;
			let offset = page * limit - limit;

			let whereClause = {};
			if (muscle_group_id) whereClause.muscle_group_id = muscle_group_id;
			if (user_id) whereClause.user_id = user_id;

			const exercises = await Exercises.findAndCountAll({
				where: Object.keys(whereClause).length ? whereClause : undefined,
				limit,
				offset,
			});
			return res.json(exercises);
		} catch (error) {
			next(ApiError.internal('Ошибка при получении списка упражнений'));
		}
	}

	async getOne(req, res, next) {
		try {
			const { id } = req.params;
			if (!id) {
				return next(ApiError.badRequest('ID обязателен'));
			}

			const exercise = await Exercises.findOne({
				where: { id },
				// include: [{ model: ExerciseInfo, as: "info" }],
			});

			if (!exercise) {
				return next(ApiError.notFound('Упражнение не найдено'));
			}

			return res.json(exercise);
		} catch (error) {
			next(ApiError.internal('Ошибка при получении упражнения'));
		}
	}

	async delete(req, res, next) {
		try {
			const { id } = req.params;
			if (!id) {
				return next(ApiError.badRequest('ID обязателен'));
			}

			const exercise = await Exercises.findOne({ where: { id } });
			if (!exercise) {
				return next(ApiError.notFound('Упражнение не найдено'));
			}

			const exerciseInfo = await ExerciseInfo.findAll({ where: { exercise_id: id } });

			// Удаляем файлы, если они есть
			exerciseInfo.forEach((item) => {
				if (item.type === 'IMAGE' && item.description) {
					const filePath = path.resolve(__dirname, '..', '..', 'static', item.description);
					if (fs.existsSync(filePath)) {
						fs.unlinkSync(filePath);
					}
				}
			});

			await ExerciseInfo.destroy({ where: { exercise_id: id } });
			await Exercises.destroy({ where: { id } });

			return res.json({ message: 'Упражнение успешно удалено' });
		} catch (error) {
			console.log(error)
			next(ApiError.internal('Ошибка при удалении упражнения'));
		}
	}

	async update(req, res, next) {
		try {
			const { id } = req.params;
			const { name, muscleGroupId, description } = req.body;

			if (!id) {
				return next(ApiError.badRequest('ID обязателен'));
			}

			const [count, updatedRows] = await Exercises.update(
				{ name, muscle_group_id: muscleGroupId, description },
				{ where: { id }, returning: true },
			);

			if (count === 0) {
				return next(ApiError.notFound('Упражнение не найдено'));
			}

			return res.json(updatedRows[0]);
		} catch (error) {
			next(ApiError.internal('Ошибка при обновлении упражнения'));
		}
	}
}

module.exports = new ExercisesController();
