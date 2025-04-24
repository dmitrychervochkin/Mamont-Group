export const addPatternWorkoutExercise = (patternWorkoutExerciseData, token) =>
	fetch(`${process.env.REACT_APP_API_URL}api/pattern_workout_exercises`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
		body: JSON.stringify({
			set: patternWorkoutExerciseData.set,
			reps: patternWorkoutExerciseData.reps,
			weight: patternWorkoutExerciseData.weight,
			patternId: patternWorkoutExerciseData.patternId,
			exerciseId: patternWorkoutExerciseData.exerciseId,
			patternExerciseId: patternWorkoutExerciseData.patternExerciseId,
		}),
	}).then((data) => data.json());
