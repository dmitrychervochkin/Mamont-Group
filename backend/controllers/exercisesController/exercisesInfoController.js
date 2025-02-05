const ApiError = require('../../error/ApiError');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const { ExerciseInfo } = require('../../models/models');
const TYPE = require('../../constants/TYPE');

class ExercisesInfoController {
	async create(req, res, next) {
		try {
			let { type, exerciseId, discription } = req.body;
			let fileName;

			const exerciseInfoImg = await ExerciseInfo.findAll({
				where: { type: TYPE.IMAGE, exercise_id: exerciseId },
			});

			if (!discription) {
				if (exerciseInfoImg.length >= 3) {
					return next(ApiError.badRequest('Превышен лимит "IMAGE" для упражнения'));
				}
				const { img } = req.files;
				fileName = uuid.v4() + '.jpg';
				img.mv(path.resolve(__dirname, '..', '..', 'static', fileName));
			} else {
				fileName = discription;
			}

			// const searchtExercises = await ExerciseInfo.findOne({
			// 	where: { name, user_id: userId },
			// });

			// console.log(searchtExercises);

			// if (!searchtExercises) {
			// }

			const exerciseInfo = await ExerciseInfo.create({
				exercise_id: exerciseId,
				type: type,
				discription: fileName,
			});

			return res.json(exerciseInfo);
		} catch (err) {
			return next(ApiError.badRequest(err.message));
		}
	}
	async getAll(req, res) {
		let { exercise_id, type } = req.query;

		let exerciseInfo;

		if (!exercise_id) {
			exerciseInfo = await ExerciseInfo.findAll();
		}
		if (exercise_id) {
			exerciseInfo = await ExerciseInfo.findAll({ where: { exercise_id } });
		}
		// if (type && !exercise_id) {
		// 	exerciseInfo = await ExerciseInfo.findAll({ where: { type } });
		// }
		// if (type && exercise_id) {
		// 	exerciseInfo = await ExerciseInfo.findAll({ where: { type, exercise_id } });
		// }
		return res.json(exerciseInfo);
	}
	async getOne(req, res) {
		const { id } = req.params;
		const exerciseInfo = await ExerciseInfo.findOne({
			where: { id: { id } },
			// include: [{ model: ExerciseInfo, as: 'info' }],
		});
		return res.json(exerciseInfo);
	}
	async delete(req, res) {
		const { id } = req.params;
		const exerciseInfo = await ExerciseInfo.findOne({
			where: { id },
		});
		console.log(exerciseInfo);
		if (fs.existsSync(path.resolve(__dirname, '..', '..', 'static') + '/' + exerciseInfo.discription)) {
			fs.unlinkSync(path.resolve(__dirname, '..', '..', 'static') + '/' + exerciseInfo.discription);
		}

		const exerciseToDelete = await ExerciseInfo.destroy({
			where: { id },
		});

		return res.json(true);
	}
	async update(req, res, next) {
		try {
			const { id } = req.params;
			const { discription, type: fileType, oldImg } = req.body;
			let img;
			let fileName;

			if (typeof discription === 'undefined') {
				console.log(id, discription, fileType, oldImg, img);
				img = req.files.img;
				fileName = uuid.v4() + '.jpg';
				if (oldImg !== undefined) {
					fs.unlinkSync(path.resolve(__dirname, '..', '..', 'static') + '/' + oldImg);
				}
				img.mv(path.resolve(__dirname, '..', '..', 'static', fileName));
			} else {
				fileName = discription;
			}

			// const searchtExercises = await Exercises.findOne({
			// 	where: { name, user_id: userId },
			// });

			const options = { where: { id }, returning: true };
			const [count, type] = await ExerciseInfo.update(
				{ type: fileType, discription: fileName },
				options,
			);

			return res.json(type);
		} catch (err) {
			return next(ApiError.badRequest(err.message));
		}
	}
}

module.exports = new ExercisesInfoController();
