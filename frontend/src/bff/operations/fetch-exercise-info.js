import { getExerciseInfo, getExercises } from '../api';

export const fetchExerciseInfo = async (exerciseId, type) => {
	if (!exerciseId) {
		exerciseId = '';
	} else if (!type) {
		type = '';
	}

	let exerciseInfo = await getExerciseInfo(exerciseId, type);

	return {
		error: null,
		res: exerciseInfo,
	};
};
