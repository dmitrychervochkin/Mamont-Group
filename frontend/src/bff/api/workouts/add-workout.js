export const addWorkout = (workoutData, token) =>
	fetch(`http://localhost:7001/api/workout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
		body: JSON.stringify({
			userId: workoutData.userId,
			time: workoutData.time,
			name: workoutData.name,
		}),
	}).then((loadedWorkout) => loadedWorkout.json());
