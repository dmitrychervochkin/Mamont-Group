export const deleteExerciseInfo = (id) =>
	fetch(`${REACT_APP_API_URL}/api/exercise_info/${id}`, {
		method: 'DELETE',
	});
