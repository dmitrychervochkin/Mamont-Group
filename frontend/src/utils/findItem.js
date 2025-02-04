export const findItem = (array, id) => {
	if (!id) {
		return;
	}

	const item = array?.find((item) => item.id === id);

	return item;
};
