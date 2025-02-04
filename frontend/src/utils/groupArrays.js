export const groupArrays = (array, options) => {
	const { toReturn, filteredBy } = options;

	let groups = {};
	for (let i = 0; i < array.length; i++) {
		let item = array[i];

		// if (!groups[item.exerciseId]) {
		// 	groups[item.exerciseId] = [];
		// }
		// console.log(item['superSet'])

		if (!item[filteredBy]) {
			groups[item.id] = [];
		} else if (!groups[item[filteredBy]]) {
			groups[item[filteredBy]] = [];
		}

		if (item[filteredBy] === null) {
			groups[item.id].push(item);
		} else {
			groups[item[filteredBy]].push(item);
		}
	}

	let arrays = [];

	for (let group in groups) {
		if (!groups.hasOwnProperty(group)) {
			continue;
		}

		if (groups[group].length === 1) {
			arrays.push(groups[group][0]);
		} else if (group === 'null') {
			arrays.push(...groups[group]);
		} else {
			arrays.push(groups[group]);
		}
	}

	if (toReturn === 'group') {
		return groups;
	} else {
		return arrays;
	}
};

// let groups = {};
// for (let i = 0; i < userExercises.length; i++) {
// 	let item = userExercises[i];

// 	if (item?.superSet === null) {
// 		groups[item.id] = [];
// 	} else if (!groups[item.superSet]) {
// 		groups[item.superSet] = [];
// 	}

// 	if (item.superSet === null) {
// 		groups[item.id].push(item);
// 	} else {
// 		groups[item.superSet].push(item);
// 	}
// }

// let userExercisesWithSupersets = [];

// for (let group in groups) {
// 	if (!groups.hasOwnProperty(group)) {
// 		continue;
// 	}

// 	if (groups[group].length === 1) {
// 		userExercisesWithSupersets.push(groups[group][0]);
// 	} else if (group === 'null') {
// 		userExercisesWithSupersets.push(...groups[group]);
// 	} else {
// 		userExercisesWithSupersets.push(groups[group]);
// 	}
// }
