export const transformExercises = (dbExercises) => ({
	id: dbExercises.id,
	name: dbExercises.name,
	userId: dbExercises.user_id,
	muscleGroupId: dbExercises.muscle_group_id,
	description: dbExercises.description,
});
