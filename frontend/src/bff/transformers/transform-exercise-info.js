export const transformExerciseInfo = (dbExerciseInfo) => ({
	id: dbExerciseInfo.id,
	description: dbExerciseInfo.description,
	exerciseId: dbExerciseInfo.exercise_id,
	type: dbExerciseInfo.type,

});
