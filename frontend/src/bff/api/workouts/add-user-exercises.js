export const addUserExercises = (userExercisesData, workoutId, token) =>
	fetch(`http://localhost:7001/api/user_exercises`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
		body: JSON.stringify({
			exerciseId: userExercisesData.exerciseId,
			workoutId: workoutId,
			name: userExercisesData.name,
			muscleGroupId: userExercisesData.muscleGroupId,
			superSet: userExercisesData.superSet,
		}),
	}).then((loadedUserExercises) => loadedUserExercises.json());
