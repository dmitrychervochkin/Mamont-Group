export const addExerciseInfo = (formData) =>
	fetch(`${REACT_APP_API_URL}/api/exercise_info`, {
		method: 'POST',
		body: formData,
	}).then((loadedInfo) => loadedInfo.json());
