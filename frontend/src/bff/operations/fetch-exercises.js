import { getExerciseInfo, getExercises } from '../api';

export const fetchExercises = async (currentMuscleGroup) => {
	const params = new URLSearchParams();

	if (currentMuscleGroup && currentMuscleGroup !== '') {
		params.append('muscle_group_id', currentMuscleGroup);
	}

	let exercises = await getExercises(params);

	if (exercises.rows) {
		exercises.rows = exercises.rows.sort((a, b) => a.id > b.id);
	}

	return {
		error: null,
		res: exercises,
	};
};
