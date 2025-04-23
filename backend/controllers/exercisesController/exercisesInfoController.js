const ApiError = require('../../error/ApiError');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const { ExerciseInfo } = require('../../models/models');
const TYPE = require('../../constants/TYPE');

class ExercisesInfoController {
	async create(req, res, next) {
		try {
			let { type, exerciseId, description } = req.body;
			let fileName;

			if (!exerciseId || !type) {
				return next(ApiError.badRequest('exerciseId и type обязательны'));
			}

			const existingImages = await ExerciseInfo.findAll({
				where: { type: TYPE.IMAGE, exercise_id: exerciseId },
			});
			
			if (!description || typeof description !== 'string' || description.trim() === '') {
				console.log('DESCRIPTION ПУСТОЙ ИЛИ НЕ СТРОКА, ПАРСИМ КАРТИНКУ');

				if (existingImages.length >= 3) {
					return next(ApiError.badRequest('Превышен лимит "IMAGE" для упражнения'));
				}

				if (!req.files || !req.files.img) {
					return next(ApiError.badRequest('Файл не загружен'));
				}

				const { img } = req.files;
				fileName = uuid.v4() + '.jpg';
				await img.mv(path.resolve(__dirname, '..', '..', 'static', fileName));
			} else {
				console.log('DESCRIPTION НЕ ПУСТОЙ:', description);
				fileName = description;
			}

			console.log(exerciseId, type, description);

			const exerciseInfo = await ExerciseInfo.create({
				exercise_id: exerciseId,
				type,
				description: fileName,
			});

			return res.json(exerciseInfo);
		} catch (err) {
			next(ApiError.badRequest('Ошибка при создании: ' + err.message));
		}
	}

	async getAll(req, res, next) {
		try {
			const { exercise_id, type } = req.query;
			const whereClause = {};

			if (exercise_id) whereClause.exercise_id = exercise_id;
			if (type) whereClause.type = type;

			const exerciseInfo = await ExerciseInfo.findAll({ where: whereClause });

			return res.json(exerciseInfo);
		} catch (error) {
			next(ApiError.internal('Ошибка при получении списка'));
		}
	}

	async getOne(req, res, next) {
		try {
			const { id } = req.params;
			if (!id) {
				return next(ApiError.badRequest('ID обязателен'));
			}

			const exerciseInfo = await ExerciseInfo.findOne({ where: { id } });

			if (!exerciseInfo) {
				return next(ApiError.notFound('Информация об упражнении не найдена'));
			}

			return res.json(exerciseInfo);
		} catch (error) {
			next(ApiError.internal('Ошибка при получении информации'));
		}
	}

	async delete(req, res, next) {
		try {
			const { id } = req.params;
			if (!id) {
				return next(ApiError.badRequest('ID обязателен'));
			}

			const exerciseInfo = await ExerciseInfo.findOne({ where: { id } });

			if (!exerciseInfo) {
				return next(ApiError.notFound('Информация об упражнении не найдена'));
			}

			const filePath = path.resolve(__dirname, '..', '..', 'static', exerciseInfo.description);
			if (fs.existsSync(filePath)) {
				fs.unlinkSync(filePath);
			}

			await ExerciseInfo.destroy({ where: { id } });

			return res.json({ message: 'Информация об упражнении удалена' });
		} catch (error) {
			next(ApiError.internal('Ошибка при удалении'));
		}
	}

	async update(req, res, next) {
		try {
			const { id } = req.params;
			const { description, type: fileType, oldImg } = req.body;

			if (!id) {
				return next(ApiError.badRequest('ID обязателен'));
			}

			let fileName = description;

			if (!description) {
				if (!req.files?.img) {
					return next(ApiError.badRequest('Файл не загружен'));
				}

				const { img } = req.files;
				fileName = uuid.v4() + '.jpg';

				if (oldImg) {
					const oldFilePath = path.resolve(__dirname, '..', '..', 'static', oldImg);
					if (fs.existsSync(oldFilePath)) {
						fs.unlinkSync(oldFilePath);
					}
				}

				img.mv(path.resolve(__dirname, '..', '..', 'static', fileName));
			}

			const [count, updatedRows] = await ExerciseInfo.update(
				{ type: fileType, description: fileName },
				{ where: { id }, returning: true },
			);

			if (count === 0) {
				return next(ApiError.notFound('Информация об упражнении не найдена'));
			}

			return res.json(updatedRows[0]);
		} catch (err) {
			next(ApiError.badRequest('Ошибка при обновлении: ' + err.message));
		}
	}
}

module.exports = new ExercisesInfoController();
