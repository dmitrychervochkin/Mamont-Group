import { addType, addUserExercises, addWorkout, addWorkoutExercises, updateType } from '../api';
import { addPatternExercise } from '../api/patterns/add-pattern-exercise';
import { savePatternWorkoutExercises } from './save-pattern-workout-exercise';
import { saveWorkoutExercises } from './save-workout-exercises';

export const savePatternExercise = async (newExerciseData, newPatternWorkoutExercisesData, patternId) => {
	const userToken = localStorage.getItem('token');

	let savedPatternExercise = await addPatternExercise(newExerciseData, patternId, userToken);
	let savedPatternWorkoutExercises = [];

	for (let item in newPatternWorkoutExercisesData) {
		if (newExerciseData.id === newPatternWorkoutExercisesData[item].userExerciseId) {
			savedPatternWorkoutExercises = await savePatternWorkoutExercises(
				newPatternWorkoutExercisesData[item],
				savedPatternExercise.id,
				patternId,
			);
		}
	}

	return {
		error: null,
		res: savedPatternExercise,
	};
};
