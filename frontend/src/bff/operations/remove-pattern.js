import { deleteExercise, deletePattern, deleteUser, deleteWorkout } from '../api';

export const removePattern = async (id) => {
    const userToken = localStorage.getItem('token');

    await deletePattern(id, userToken);

    return {
        error: null,
        res: true,
    };
};
