export const transformWorkoutExercises = (dbWorkoutExercises) => ({
	id: dbWorkoutExercises.id,
	userExerciseId: dbWorkoutExercises.user_exercise_id,
	reps: dbWorkoutExercises.reps,
	weight: dbWorkoutExercises.weight,
	workoutId: dbWorkoutExercises.workout_id,
	exerciseId: dbWorkoutExercises.exercise_id,
	set: dbWorkoutExercises.set,
});
