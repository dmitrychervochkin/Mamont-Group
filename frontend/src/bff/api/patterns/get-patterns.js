import { transformWorkouts } from '../../transformers';

export const getPatterns = async (id) =>
	fetch(`http://localhost:7001/api/patterns/${id}`).then((data) => data.json());
