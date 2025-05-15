export const timeConverter = (totalSeconds) => {
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	const pad = (num) => String(num).padStart(2, '0');

	return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

export const stringTimeConverter = (string) => {
	const parts = string.split(':').map(Number);

	if (parts.length === 2) {
		// Формат типа "MM:SS"
		const [minutes, seconds] = parts;
		return minutes * 60 + seconds;
	} else if (parts.length === 3) {
		// Формат типа "HH:MM:SS"
		const [hours, minutes, seconds] = parts;
		return hours * 3600 + minutes * 60 + seconds;
	}
};
