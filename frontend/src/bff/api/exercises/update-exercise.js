export const updateExercise = (id, formData) =>
	fetch(`http://localhost:7001/api/exercises/${id}`, {
		method: 'PATCH',
		body: formData,
	}).then((loadedRole) => loadedRole.json());
