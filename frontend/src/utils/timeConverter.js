export const timeConverter = (seconds) => {
	let minutes = Math.floor(seconds / 60);
	let hours = 0;
	seconds = seconds % 60;

	if (seconds >= 3600) {
		hours = minutes / 60;
	}
	if (Number(seconds) < 10) {
		seconds = '0' + seconds;
	}
	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	if (hours < 10) {
		hours = '0' + hours;
	}

	return `${hours}:${minutes}:${seconds}`;
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
