import { addPattern, addUserPattern } from '../api';

import { savePatternExercise } from './save-pattern-exercise';

export const savePattern = async (
	newPatternData,
	userId,
	newPatternExercisesData,
	newPatternWorkoutExercisesData,
) => {
	const userToken = localStorage.getItem('token');

	let savedPattern;
	let savedPatternUser;
	let savedPatternExercises;

	if (newPatternData.id === undefined || newPatternData.id === '') {
		savedPattern = await addPattern(newPatternData, userToken);

		if (savedPattern.message !== undefined) {
			return {
				error: savedPattern.message,
				res: null,
			};
		} else {
			savedPatternUser = await addUserPattern(userId, savedPattern.id, userToken);
			savedPatternExercises = await Promise.all(
				newPatternExercisesData.map((item) =>
					savePatternExercise(item, newPatternWorkoutExercisesData, savedPattern.id),
				),
			);
		}
	} else {
	}

	return {
		error: null,
		res: savedPattern,
	};
};
