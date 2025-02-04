import { transformWorkouts, transforPatternmWorkoutExercises } from '../../transformers';
import { transformWorkoutExercises } from '../../transformers/transform-workout-exercises';

export const getPatternWorkoutExercises = async (patternId) =>
	fetch(`http://localhost:7001/api/pattern_workout_exercises?pattern_id=${patternId}`)
		.then((data) => data.json())
		.then((data) => data && data.map(transforPatternmWorkoutExercises));
