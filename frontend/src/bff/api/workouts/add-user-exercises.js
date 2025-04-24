export const addUserExercises = (userExercisesData, workoutId, token) =>
	fetch(`${process.env.REACT_APP_API_URL}api/user_exercises`, {
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
