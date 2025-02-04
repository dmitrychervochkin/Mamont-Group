export const addExerciseInfo = (formData) =>
	fetch(`http://localhost:7001/api/exercise_info`, {
		method: 'POST',
		body: formData,
	}).then((loadedInfo) => loadedInfo.json());
