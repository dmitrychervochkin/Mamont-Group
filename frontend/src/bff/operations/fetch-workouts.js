import { getUsers, getWorkouts } from '../api';

export const fetchWorkouts = async (userId, page, limit) => {
	let workouts = await getWorkouts(userId, page, limit);

	return {
		error: null,
		res: workouts,
	};
};
