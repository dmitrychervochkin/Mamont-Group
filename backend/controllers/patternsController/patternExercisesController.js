const { PatternExercises } = require('../../models/models');
const ApiError = require('../../error/ApiError');
const { Workout, UserExercises } = require('../../models/models');

class PatternExercisesController {
	async create(req, res, next) {
		try {
			let { name, superSet, patternId, muscleGroupId, exerciseId } = req.body;

			const patternExercise = await PatternExercises.create({
				name,
				super_set: superSet,
				muscle_group_id: muscleGroupId,
				exercise_id: exerciseId,
				pattern_id: patternId,
			});

			return res.json(patternExercise);
		} catch (err) {
			next(ApiError.badRequest(err.message));
		}
	}
	async getAll(req, res, next) {
		try {
			let { pattern_id } = req.query;

			const patternExercises = await PatternExercises.findAll({ where: { pattern_id } });

			return res.json(patternExercises);
		} catch (err) {
			return next(ApiError.badRequest(err.message));
		}
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

		const muscleGroups = await Workout.destroy({
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

module.exports = new PatternExercisesController();
