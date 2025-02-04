export const transformExercises = (dbExercises) => ({
	id: dbExercises.id,
	name: dbExercises.name,
	userId: dbExercises.user_id,
	typeId: dbExercises.type_id,
	infoId: dbExercises.info_id,
	discription: dbExercises.discription,
});
