export const getScreenWidth = (width) => {
	const currentWidth = window.innerWidth;

	return currentWidth > width;
};
