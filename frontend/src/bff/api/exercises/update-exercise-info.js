export const updateExerciseInfo = (id, formData) =>
	fetch(`http://localhost:7001/api/exercise_info/${id}`, {
		method: 'PATCH',
		body: formData,
	}).then((data) => data.json());
