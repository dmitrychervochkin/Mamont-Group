
export const sanitizeString = (str) => {
	return str.replace(/"/g, '').trim();
};