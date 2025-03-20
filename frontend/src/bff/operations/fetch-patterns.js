import { getPatterns, getUserPatterns, getUsers, getWorkouts } from '../api';

export const fetchPatterns = async (userId, limit, page) => {
	let userPatterns = await getUserPatterns(userId, limit, page);
	let patterns = [];

	patterns = await Promise.all(userPatterns.rows.map((item) => getPatterns(item.patternId)));

	return {
		error: null,
		res: patterns,
	};
};
