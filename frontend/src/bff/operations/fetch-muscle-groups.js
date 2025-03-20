import { getMuscleGroups, getTypes } from '../api';

export const fetchMuscleGroups = async () => {
	let muscleGroups = await getMuscleGroups();
	
	if (muscleGroups) {
		muscleGroups = muscleGroups.sort((a, b) => a.id > b.id);
	}

	return {
		error: null,
		res: muscleGroups,
	};
};
