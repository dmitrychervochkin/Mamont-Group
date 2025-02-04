export const deleteExercise = (id) =>
	fetch(`http://localhost:7001/api/exercises/${id}`, {
		method: 'DELETE',
	});
