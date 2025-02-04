import { addPattern, addUserPattern } from '../api';

import { savePatternExercise } from './save-pattern-exercise';

export const savePattern = async (
	newPatternData,
	userId,
	newPatternExercisesData,
	newPatternWorkoutExercisesData,
) => {
	const userToken = localStorage.getItem('token');
	// console.log(newPatternData, userId, newPatternExercisesData, newPatternWorkoutExercisesData);

	let savedPattern;
	let savedPatternUser;
	let savedPatternExercises;

	if (newPatternData.id === undefined) {
		savedPattern = await addPattern(newPatternData, userToken);
		savedPatternUser = await addUserPattern(userId, savedPattern.id, userToken);
		savedPatternExercises = await Promise.all(
			newPatternExercisesData.map((item) =>
				savePatternExercise(item, newPatternWorkoutExercisesData, savedPattern.id),
			),
		);
	} else{
		
	}

	return {
		error: null,
		res: savedPattern,
	};
};
