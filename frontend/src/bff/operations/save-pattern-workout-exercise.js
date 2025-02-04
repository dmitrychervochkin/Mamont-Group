import { addType, addWorkout, addWorkoutExercises, updateType } from '../api';
import { addPatternWorkoutExercise } from '../api/patterns/add-pattern-workout-exercise';

export const savePatternWorkoutExercises = async (
	newPatternWorkoutExercisesData,
	patternExerciseId,
	patternId,
) => {
	const userToken = localStorage.getItem('token');

	let savedPatternWorkoutExercises = await addPatternWorkoutExercise(
		{
			exerciseId: newPatternWorkoutExercisesData.exerciseId,
			patternExerciseId: patternExerciseId,
			patternId: patternId,
			reps: newPatternWorkoutExercisesData.reps,
			set: newPatternWorkoutExercisesData.set,
			weight: newPatternWorkoutExercisesData.weight,
		},
		userToken,
	);

	return {
		error: null,
		res: savedPatternWorkoutExercises,
	};
};
