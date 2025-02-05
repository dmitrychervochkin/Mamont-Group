import { getPatterns, getUserPatterns, getUsers, getWorkouts } from '../api';

export const fetchPattern = async (patternId) => {
	let pattern = await getPatterns(patternId);

	return {
		error: null,
		res: pattern,
	};
};
