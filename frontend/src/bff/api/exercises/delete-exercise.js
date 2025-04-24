export const deleteExercise = (id) =>
	fetch(`${process.env.REACT_APP_API_URL}api/exercises/${id}`, {
		method: 'DELETE',
	});
