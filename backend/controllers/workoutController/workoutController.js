const ApiError = require('../../error/ApiError');
const { Workout, UserExercises, WorkoutExercises } = require('../../models/models');

class WorkoutController {
	async create(req, res, next) {
		try {
			let { userId, time, name } = req.body;
			let date = new Date().toString();
			// let day = date.getDate();
			// let month = date.getMonth() + 1;
			// let year = date.getFullYear();
			// if (day < 10) {
			// 	day = '0' + day;
			// }
			// if (month < 10) {
			// 	month = '0' + month;
			// }
			// date = `${day}.${month}.${year}`;

			const workout = await Workout.create({ name, user_id: userId, date, time });

			return res.json(workout);
		} catch (err) {
			return next(ApiError.badRequest(err.message));
		}
	}
	async getAll(req, res, next) {
		try {
			let { user_id, limit, page } = req.query;
			page = page || 1;
			limit = limit || 9;
			let offset = page * limit - limit;
			const workout = await Workout.findAndCountAll({
				where: { user_id },
				order: [['createdAt', 'DESC']],
				limit,
				offset,
			});

			return res.json(workout);
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

module.exports = new WorkoutController();
