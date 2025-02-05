const { Pattern, UserPattern } = require('../../models/models');
const ApiError = require('../../error/ApiError');
const { Workout, UserExercises, WorkoutExercises } = require('../../models/models');

class UserPatternController {
	async create(req, res, next) {
		try {
			let { userId, patternId } = req.body;

			let date = new Date();
			let day = date.getDate();
			let month = date.getMonth() + 1;
			let year = date.getFullYear();
			if (day < 10) {
				day = '0' + day;
			}
			if (month < 10) {
				month = '0' + month;
			}
			date = `${day}.${month}.${year}`;

			const userPattern = await UserPattern.create({ date, user_id: userId, pattern_id: patternId });

			return res.json(userPattern);
		} catch (err) {
			next(ApiError.badRequest(err.message));
		}
	}
	async getAll(req, res) {
		try {
			let { user_id, limit, page } = req.query;

			page = page || 1;
			limit = limit || 9;
			let offset = page * limit - limit;
			const userPatterns = await UserPattern.findAndCountAll({ where: { user_id }, limit, offset });

			return res.json(userPatterns);
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

		const userExercises = await UserExercises.destroy({
			where: { workout_id: id },
		});
		const workoutExercises = await WorkoutExercises.destroy({
			where: { workout_id: id },
		});

		const workouts = await Workout.destroy({
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

module.exports = new UserPatternController();
