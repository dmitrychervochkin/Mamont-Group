const Router = require('express');
const PatternWorkoutExercisesController = require('../../controllers/patternsController/patternWorkoutExercisesController');

const router = new Router();

router.post('/', PatternWorkoutExercisesController.create);
router.get('/', PatternWorkoutExercisesController.getAll);
// router.get('/:id', PatternWorkoutExercisesController.getOne);
// router.patch('/:id', PatternWorkoutExercisesController.update);
router.delete('/:id', PatternWorkoutExercisesController.delete);

module.exports = router;
