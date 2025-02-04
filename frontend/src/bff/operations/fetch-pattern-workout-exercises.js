import { getPatternWorkoutExercises, getUsers, getWorkouts } from '../api';
import { getWorkoutExercises } from '../api/workouts/get-workout-exercises';

export const fetchPatternWorkoutExercises = async (patternId) => {
    let patternWorkoutExercises = await getPatternWorkoutExercises(patternId);

    return {
        error: null,
        res: patternWorkoutExercises,
    };
};
