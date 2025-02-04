export const deleteExerciseInfo = (id) =>
	fetch(`http://localhost:7001/api/exercise_info/${id}`, {
		method: 'DELETE',
	});
