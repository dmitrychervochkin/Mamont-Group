import { addCalendarEvent, addCalendarTypeEvent, addPattern, addUserPattern } from '../api';

import { savePatternExercise } from './save-pattern-exercise';

export const saveCalendarEvent = async (newCalendarEventData, newCalendarTypeData) => {
	const userToken = localStorage.getItem('token');

	let savedCalendarEvent;
	let savedCalendarTypeEvent;

	if (newCalendarEventData.id === undefined || newCalendarEventData.id === '') {
		savedCalendarEvent = await addCalendarEvent(newCalendarEventData, userToken);
		savedCalendarTypeEvent = Promise.all(
			newCalendarTypeData.map((item) => addCalendarTypeEvent(item.id, savedCalendarEvent.id)),
		);
	} else {
	}

	return {
		error: null,
		res: savedCalendarEvent,
	};
};
