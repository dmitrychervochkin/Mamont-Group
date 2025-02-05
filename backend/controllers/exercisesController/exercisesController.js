const ApiError = require('../../error/ApiError');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const { Exercises, ExerciseInfo } = require('../../models/models');

class ExercisesController {
	async create(req, res, next) {
		try {
			let { name, typeId, userId, discription } = req.body;
			// const { img } = req.files;
			// let fileName = uuid.v4() + '.jpg';

			const searchtExercises = await Exercises.findOne({
				where: { name, user_id: userId },
			});

			// if (!searchtExercises) {
			// 	img.mv(path.resolve(__dirname, '..', 'static', fileName));
			// }

			const exercise =
				searchtExercises?.dataValues?.user_id == userId
					? searchtExercises.dataValues
					: await Exercises.create({
							name,
							type_id: typeId,
							user_id: userId,
							discription,
					  });

			// if (info) {
			// 	info = JSON.parse(info);
			// 	info.forEach((i) =>
			// 		ExerciseInfo.create({
			// 			exerciseId: exercise.id,
			// 			recommendation: i.recommendation,
			// 			description: i.description,
			// 		}),
			// 	);
			// }

			return res.json(exercise);
		} catch (err) {
			next(ApiError.badRequest(err.message));
		}
	}
	async getAll(req, res) {
		let { type_id, userId, limit, page } = req.query;
		page = page || 1;
		limit = limit || 20;
		let offset = page * limit - limit;
		let exercises;

		if (!type_id && !userId) {
			exercises = await Exercises.findAndCountAll({ limit, offset });
		}
		if (!type_id && userId) {
			exercises = await Exercises.findAndCountAll({ where: { userId }, limit, offset });
		}
		if (type_id && !userId) {
			exercises = await Exercises.findAndCountAll({ where: { type_id }, limit, offset });
		}
		if (type_id && userId) {
			exercises = await Exercises.findAndCountAll({ where: { type_id, userId }, limit, offset });
		}
		return res.json(exercises);
	}
	async getOne(req, res) {
		const { id } = req.params;
		const exercise = await Exercises.findOne({
			where: { id: { id } },
			// include: [{ model: ExerciseInfo, as: 'info' }],
		});
		return res.json(exercise);
	}
	async delete(req, res) {
		const { id } = req.params;
		const exercise = await Exercises.findOne({
			where: { id },
		});
		const exerciseInfo = await ExerciseInfo.findAll({
			where: { exercise_id: id },
		});

		exerciseInfo.forEach((item) => {
			if (item.type === 'IMAGE') {
				fs.unlinkSync(path.resolve(__dirname, '..', '..', 'static') + '/' + item.discription);
			} 
		});

		const exerciseInfoToDelete = await ExerciseInfo.destroy({
			where: { exercise_id: id },
		});

		const exerciseToDelete = await Exercises.destroy({
			where: { id },
		});

		return res.json(exerciseInfoToDelete);
	}
	async update(req, res) {
		const { id } = req.params;
		const { name, typeId, discription } = req.body;

		// const searchtExercises = await Exercises.findOne({
		// 	where: { name, user_id: userId },
		// });

		const options = { where: { id }, returning: true };
		const [count, type] = await Exercises.update(
			{ name, type_id: typeId, discription: discription },
			options,
		);

		return res.json(type);
	}
}

module.exports = new ExercisesController();
