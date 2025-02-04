import { getExerciseInfo, getExercises } from '../api';

export const fetchExercises = async (currentType) => {
	if (currentType === undefined) {
		currentType = '';
	}
	let exercises = await getExercises(currentType);

	if (exercises.rows) {
		exercises.rows = exercises.rows.sort((a, b) => a.id > b.id);
	}

	return {
		error: null,
		res: exercises,
	};
};
