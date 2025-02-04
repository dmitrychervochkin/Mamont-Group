import { addType, updateType } from '../api';

export const saveType = async (newTypeData) => {
	if (newTypeData.name === '') {
		return {
			error: 'Неккоректное название типа!',
			res: null,
		};
	}
	const userToken = localStorage.getItem('token');

	const savedType =
		newTypeData.id === undefined
			? await addType(newTypeData, userToken)
			: await updateType(newTypeData, userToken);

	return {
		error: null,
		res: savedType,
	};
};
