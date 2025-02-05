import { transformUserPattern, transformWorkouts } from '../../transformers';

export const getUserPatterns = async (userId) =>
	fetch(`http://localhost:7001/api/user_patterns?user_id=${userId}`)
		.then((data) => data.json())
		.then(({ count, rows }) => ({ count, rows: rows && rows.map(transformUserPattern) }));
