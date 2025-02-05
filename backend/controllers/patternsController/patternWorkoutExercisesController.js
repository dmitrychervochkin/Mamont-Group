const ApiError = require('../../error/ApiError');
const { WorkoutExercises, PatternWorkoutExercises } = require('../../models/models');

class PatternWorkoutExercisesController {
	async create(req, res, next) {
		try {
			let { set, reps, weight, patternExerciseId, exerciseId, patternId } = req.body;

			const workoutExercises = await PatternWorkoutExercises.create({
				pattern_exercise_id: patternExerciseId,
				set,
				reps,
				weight,
				exercise_id: exerciseId,
				pattern_id: patternId,
			});

			return res.json(workoutExercises);
		} catch (err) {
			next(ApiError.badRequest(err.message));
		}
	}
	async getAll(req, res, next) {
		try {
			let { pattern_id } = req.query;

			// page = page || 1;
			// limit = limit || 9;
			// let offset = page * limit - limit;

			const patternWorkoutExercises = await PatternWorkoutExercises.findAll({
				where: { pattern_id },
				// limit,
				// offset,
			});

			return res.json(patternWorkoutExercises);
		} catch (err) {
			return next(ApiError.badRequest(err.message));
		}
	}
	async delete(req, res) {
		const { id } = req.params;

		const workoutExercises = await WorkoutExercises.destroy({
			where: { id },
		});

		return res.json(true);
	}
}

module.exports = new PatternWorkoutExercisesController();
