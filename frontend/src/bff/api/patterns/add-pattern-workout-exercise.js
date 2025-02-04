export const addPatternWorkoutExercise = (patternWorkoutExerciseData, token) =>
	fetch(`http://localhost:7001/api/pattern_workout_exercises`, {
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
