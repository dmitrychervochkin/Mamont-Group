const { Pattern, PatternExercises, PatternWorkoutExercises, UserPattern } = require('../../models/models');
const ApiError = require('../../error/ApiError');
const { Workout, UserExercises, WorkoutExercises } = require('../../models/models');

class PatternController {
	async create(req, res, next) {
		try {
			let { name, discription } = req.body;

			const pattern = await Pattern.create({ name, discription });

			return res.json(pattern);
		} catch (err) {
			next(ApiError.badRequest(err.message));
		}
	}
	async getAll(req, res) {
		try {
			let { patternId } = req.query;

			// page = page || 1;
			// limit = limit || 9;
			// let offset = page * limit - limit;
			const patterns = await Pattern.findOne({ where: { id: patternId } });

			return res.json(patterns);
		} catch (err) {
			return next(ApiError.badRequest(err.message));
		}
	}
	async getOne(req, res) {
		try {
			const { id } = req.params;

			const pattern = await Pattern.findOne({
				where: { id },
			});

			return res.json(pattern);
		} catch (err) {
			next(ApiError.notFound(err.message));
		}
	}
	async delete(req, res) {
		try {
			const { id } = req.params;

			const patternExercises = await PatternExercises.destroy({
				where: { pattern_id: id },
			});
			const userPattern = await UserPattern.destroy({
				where: { pattern_id: id },
			});
			const patternWorkoutExercises = await PatternWorkoutExercises.destroy({
				where: { pattern_id: id },
			});

			const pattern = await Pattern.destroy({
				where: { id },
			});

			return res.json(true);
		} catch (err) {
			next(ApiError.notFound(err.message));
		}
	}
	async update(req, res) {
		try {
			const { id } = req.params;
			const data = req.body;

			const options = { where: { id }, returning: true };
			const [count, workout] = await Workout.update(data, options);

			return res.json(workout);
		} catch (err) {
			next(ApiError.badRequest(err.message));
		}
	}
}

module.exports = new PatternController();
