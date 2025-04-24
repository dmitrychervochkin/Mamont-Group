export const addWorkoutExercises = (workoutExercisesData, token) =>
	fetch(`${process.env.REACT_APP_API_URL}/api/workout_exercises`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
		body: JSON.stringify({
			userExerciseId: workoutExercisesData.userExerciseId,
			reps: workoutExercisesData.reps,
			weight: workoutExercisesData.weight,
			set: workoutExercisesData.set,
			workoutId: workoutExercisesData.workoutId,
			exerciseId: workoutExercisesData.exerciseId,
		}),
	}).then((loadedWorkoutExercises) => loadedWorkoutExercises.json());
