import { addExercise, updateExercise } from '../api';

export const saveExercise = async (newExerciseData) => {
	const formData = new FormData();
	formData.append('id', newExerciseData.id);
	formData.append('name', newExerciseData.name);
	formData.append('userId', newExerciseData.userId);
	formData.append('muscleGroupId', newExerciseData.muscleGroupId);
	formData.append('description', newExerciseData.description);

	const savedExercise =
		newExerciseData.id === undefined
			? await addExercise(formData)
			: await updateExercise(newExerciseData.id, formData);

	return {
		error: null,
		res: savedExercise,
	};
};
