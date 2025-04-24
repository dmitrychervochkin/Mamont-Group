export const addPatternExercise = (patternExerciseData, patternId, token) =>
	fetch(`${process.env.REACT_APP_API_URL}api/pattern_exercises`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
		body: JSON.stringify({
			exerciseId: patternExerciseData.exerciseId,
			name: patternExerciseData.name,
			superSet: patternExerciseData.superSet,
			patternId: patternId,
			muscleGroupId: patternExerciseData.muscleGroupId,
		}),
	}).then((data) => data.json());
