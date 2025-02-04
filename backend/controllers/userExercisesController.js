const ApiError = require('../error/ApiError');
const { Workout, UserExercises } = require('../models/models');

class UserExercisesController {
	async create(req, res, next) {
		try {
			let { name, superSet, workoutId, typeId, exerciseId } = req.body;

			const userExercise = await UserExercises.create({
				name,
				super_set: superSet,
				type_id: typeId,
				exercise_id: exerciseId,
				workout_id: workoutId,
			});

			return res.json(userExercise);
		} catch (err) {
			next(ApiError.badRequest(err.message));
		}
	}
	async getAll(req, res) {
		let { workout_id } = req.query;

		const userExercise = await UserExercises.findAll({ where: { workout_id } });

		return res.json(userExercise);
	}
	async getOne(req, res) {
		const { id } = req.params;
		const exercise = await Workout.findOne({
			where: { id },
		});
		return res.json(exercise);
	}
	async delete(req, res) {
		const { id } = req.params;

		const types = await Workout.destroy({
			where: { id },
		});

		return res.json(true);
	}
	async update(req, res) {
		const { id } = req.params;
		const data = req.body;

		const options = { where: { id }, returning: true };
		const [count, workout] = await Workout.update(data, options);

		return res.json(workout);
	}
}

module.exports = new UserExercisesController();
