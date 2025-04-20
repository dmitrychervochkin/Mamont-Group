import { addMuscleGroup, updateMuscleGroup } from '../api';

export const saveMuscleGroup = async (newMuscleGroupData) => {
	if (newMuscleGroupData.name === '') {
		return {
			error: 'Неккоректное название мышечной группы!',
			res: null,
		};
	}
	const userToken = localStorage.getItem('token');

	const savedMuscleGroup =
		newMuscleGroupData.id === undefined
			? await addMuscleGroup(newMuscleGroupData, userToken)
			: await updateMuscleGroup(newMuscleGroupData, userToken);

	return {
		error: null,
		res: savedMuscleGroup,
	};
};
