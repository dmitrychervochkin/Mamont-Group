export const addExercise = (formData) =>
	fetch(`http://localhost:7001/api/exercises`, {
		method: 'POST',
		body: formData,
	}).then((loadedRole) => loadedRole.json());
