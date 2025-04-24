export const deleteExerciseInfo = (id) =>
	fetch(`${process.env.REACT_APP_API_URL}api/exercise_info/${id}`, {
		method: 'DELETE',
	});
