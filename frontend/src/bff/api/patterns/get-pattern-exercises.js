import { transformPatternExercises, transformUserExercises, transformWorkouts } from '../../transformers';

export const getPatternExercises = async (patternId) =>
	fetch(`http://localhost:7001/api/pattern_exercises?pattern_id=${patternId}`)
		.then((data) => data.json())
		.then((data) => data && data.map(transformPatternExercises));
