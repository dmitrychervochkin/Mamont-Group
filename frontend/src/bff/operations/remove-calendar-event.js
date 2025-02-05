import { deleteCalendarEvent, deleteExercise, deleteUser } from "../api";

export const removeCalendarEvent = async (id) => {
    // const accessRoles = [ROLE.ADMIN];
    const userToken = localStorage.getItem('token');

    await deleteCalendarEvent(id, userToken);

    return {
        error: null,
        res: true,
    };
};
