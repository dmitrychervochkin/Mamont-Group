export const transformUserExercises = (dbUserExercises) => ({
	id: dbUserExercises.id,
	name: dbUserExercises.name,
	exerciseId: dbUserExercises.exercise_id,
	workoutId: dbUserExercises.workout_id,
	muscleGroupId: dbUserExercises.muscle_group_id,
	superSet: dbUserExercises.super_set,
});
