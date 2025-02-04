import { getPatternExercises, getUserExercises, getUsers, getWorkouts } from '../api';
import { getWorkoutExercises } from '../api/workouts/get-workout-exercises';

export const fetchPatternExercises = async (patternId) => {
    let patternExercises = await getPatternExercises(patternId);

    return {
        error: null,
        res: patternExercises,
    };
};
