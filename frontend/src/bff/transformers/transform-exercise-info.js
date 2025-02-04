export const transformExerciseInfo = (dbExerciseInfo) => ({
	id: dbExerciseInfo.id,
	discription: dbExerciseInfo.discription,
	exerciseId: dbExerciseInfo.exercise_id,
	type: dbExerciseInfo.type,

});
