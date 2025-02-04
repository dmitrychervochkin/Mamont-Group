import { transformWorkouts } from '../../transformers';

export const getWorkouts = async (userId, page, limit) =>
	fetch(`http://localhost:7001/api/workout?user_id=${userId}&page=${page}&limit=${limit}`)
		.then((loadedWorkouts) => loadedWorkouts.json())
		.then(({ count, rows }) => ({ count, rows: rows && rows.map(transformWorkouts) }));
