import { transformExerciseInfo, transformExercises } from '../../transformers';

export const getExerciseInfo = async (exerciseId, type) =>
	fetch(`http://localhost:7001/api/exercise_info?exercise_id=${exerciseId}&type=${type}`)
		.then((loadedExerciseInfo) => loadedExerciseInfo.json())
		.then((loadedExerciseInfo) => loadedExerciseInfo && loadedExerciseInfo.map(transformExerciseInfo));
