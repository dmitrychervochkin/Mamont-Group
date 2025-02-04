export const transformUserExercises = (dbUserExercises) => ({
	id: dbUserExercises.id,
	name: dbUserExercises.name,
	exerciseId: dbUserExercises.exercise_id,
	workoutId: dbUserExercises.workout_id,
	typeId: dbUserExercises.type_id,
	superSet: dbUserExercises.super_set,
});
