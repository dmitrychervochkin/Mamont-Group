export const findLastSet = (array, id, options) => {
	const filteredWorkouts = array.filter((item) => {
		return item.workoutId === id;
	});

	let groups = {};
	for (let i = 0; i < filteredWorkouts.length; i++) {
		let item = filteredWorkouts[i];

		if (!groups[item.exerciseId]) {
			groups[item.exerciseId] = [];
		}

		groups[item.exerciseId].push(item);
	}

	let arrays = [];

	for (let group in groups) {
		if (!groups.hasOwnProperty(group)) {
			continue;
		}

		if (groups[group].length === 1) {
			arrays.push(groups[group][0]);
		} else {
			arrays.push(groups[group]);
		}
	}

	if (options === 'group') {
		return groups;
	} else {
		return arrays;
	}
};