export const addExercise = (formData) =>
	fetch(`${REACT_APP_API_URL}/api/exercises`, {
		method: 'POST',
		body: formData,
	}).then((loadedRole) => loadedRole.json());
