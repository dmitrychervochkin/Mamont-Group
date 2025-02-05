import { transformCalendarEvents, transformExercises } from '../../transformers';

export const getCalendarEvents = async (userId) =>
    fetch(`http://localhost:7001/api/calendar_events?user_id=${userId}`)
        .then((data) => data.json())
        .then((data) => data && data.map(transformCalendarEvents));
