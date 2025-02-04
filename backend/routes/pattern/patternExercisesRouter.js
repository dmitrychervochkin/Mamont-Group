const Router = require('express');
const PatternExercisesController = require('../../controllers/patternsController/patternExercisesController');

const router = new Router();

router.post('/', PatternExercisesController.create);
router.get('/', PatternExercisesController.getAll);
router.get('/:id', PatternExercisesController.getOne);
router.patch('/:id', PatternExercisesController.update);
router.delete('/:id', PatternExercisesController.delete);

module.exports = router;
