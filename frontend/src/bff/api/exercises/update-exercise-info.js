export const updateExerciseInfo = (id, formData) =>
	fetch(`${process.env.REACT_APP_API_URL}/api/exercise_info/${id}`, {
		method: 'PATCH',
		body: formData,
	}).then((data) => data.json());
