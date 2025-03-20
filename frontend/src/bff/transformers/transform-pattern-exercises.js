export const transformPatternExercises = (data) => ({
	id: data.id,
	exerciseId: data.exercise_id,
	name: data.name,
	workoutId: data.pattern_id,
	muscleGroupId: data.muscle_group_id,
	superSet: data.super_set,
});
