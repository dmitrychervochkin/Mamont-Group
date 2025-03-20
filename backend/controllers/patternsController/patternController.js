const { PatternExercises, PatternWorkoutExercises, UserPattern, Patterns } = require('../../models/models');
const ApiError = require('../../error/ApiError');

class PatternController {
	async create(req, res, next) {
		try {
			let { name, description } = req.body;
			const searchedPattern = await Patterns.findOne({ where: { name: name } });

			if (searchedPattern) {
				return next(ApiError.badRequest('Шаблон с таким названием уже существует!'));
			} else {
				const pattern = await Patterns.create({ name, description });

				return res.json(pattern);
			}
		} catch (err) {
			return next(ApiError.badRequest(err.message));
		}
	}
	async getAll(req, res, next) {
		try {
			let { patternId } = req.query;

			const patterns = await Patterns.findOne({ where: { id: patternId } });

			return res.json(patterns);
		} catch (err) {
			return next(ApiError.badRequest(err.message));
		}
	}
	async getOne(req, res) {
		try {
			const { id } = req.params;

			const pattern = await Patterns.findOne({
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

			const pattern = await Patterns.destroy({
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
			const [count, workout] = await Patterns.update(data, options);

			return res.json(workout);
		} catch (err) {
			next(ApiError.badRequest(err.message));
		}
	}
}

module.exports = new PatternController();
