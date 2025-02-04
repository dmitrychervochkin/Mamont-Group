export const addWorkoutExercises = (workoutExercisesData, token) =>
	fetch(`http://localhost:7001/api/workout_exercises`, {
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
