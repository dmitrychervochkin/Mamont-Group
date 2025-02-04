const ApiError = require('../error/ApiError');
const { WorkoutExercises } = require('../models/models');

class WorkoutExercisesController {
	async create(req, res, next) {
		try {
			let { set, reps, weight, userExerciseId, exerciseId, workoutId } = req.body;
			console.log(set, reps, weight, userExerciseId, exerciseId, workoutId);
			const workoutExercises = await WorkoutExercises.create({
				user_exercise_id: userExerciseId,
				set,
				reps,
				weight,
				exercise_id: exerciseId,
				workout_id: workoutId,
			});

			return res.json(workoutExercises);
		} catch (err) {
			next(ApiError.badRequest(err.message));
		}
	}
	async getAll(req, res) {
		let { workout_id } = req.query;

		// page = page || 1;
		// limit = limit || 9;
		// let offset = page * limit - limit;

		const workoutExercises = await WorkoutExercises.findAll({
			where: { workout_id },
			// limit,
			// offset,
		});

		return res.json(workoutExercises);
	}
	async delete(req, res) {
		const { id } = req.params;

		const workoutExercises = await WorkoutExercises.destroy({
			where: { id },
		});

		return res.json(true);
	}
}

module.exports = new WorkoutExercisesController();
