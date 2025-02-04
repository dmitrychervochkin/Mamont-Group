export const transforPatternmWorkoutExercises = (data) => ({
	id: data.id,
	userExerciseId: data.pattern_exercise_id,
	reps: data.reps,
	weight: data.weight,
	workoutId: data.pattern_id,
	exerciseId: data.exercise_id,
	set: data.set,
});
