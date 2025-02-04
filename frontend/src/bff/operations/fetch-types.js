import { getTypes } from '../api';

export const fetchTypes = async () => {
	let types = await getTypes();

	if (types) {
		types = types.sort((a, b) => a.id > b.id);
	}

	return {
		error: null,
		res: types,
	};
};
