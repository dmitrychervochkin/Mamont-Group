import { deleteExercise, deleteExerciseInfo, deleteUser } from "../api";

export const removeExerciseInfo = async (id) => {
    // const accessRoles = [ROLE.ADMIN];
    const userToken = localStorage.getItem('token');

    await deleteExerciseInfo(id, userToken);

    return {
        error: null,
        res: true,
    };
};
