export const deleteExercise = (id) =>
	fetch(`${REACT_APP_API_URL}/api/exercises/${id}`, {
		method: 'DELETE',
	});
