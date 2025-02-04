import { transformExercises } from '../../transformers';

export const getExercises = async (currentType) =>
	fetch(`http://localhost:7001/api/exercises?type_id=${currentType}`)
		.then((loadedExercises) => loadedExercises.json())
		.then(({ count, rows }) => ({ count, rows: rows && rows.map(transformExercises) }));
