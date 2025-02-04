export const transformPatternExercises = (data) => ({
	id: data.id,
	exerciseId: data.exercise_id,
	name: data.name,
	workoutId: data.pattern_id,
	typeId: data.type_id,
	superSet: data.super_set,
});
