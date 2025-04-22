export const updateExercise = (id, formData) =>
	fetch(`${REACT_APP_API_URL}/api/exercises/${id}`, {
		method: 'PATCH',
		body: formData,
	}).then((loadedRole) => loadedRole.json());
