export const updateExercise = (id, formData) =>
	fetch(`${process.env.REACT_APP_API_URL}api/exercises/${id}`, {
		method: 'PATCH',
		body: formData,
	}).then((loadedRole) => loadedRole.json());
