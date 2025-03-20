const Router = require('express');
const userExercisesController = require('../controllers/workoutController/userExercisesController');

const router = new Router();

router.post('/', userExercisesController.create);
router.get('/', userExercisesController.getAll);
router.get('/:id', userExercisesController.getOne);
router.patch('/:id', userExercisesController.update);
router.delete('/:id', userExercisesController.delete);

module.exports = router;
