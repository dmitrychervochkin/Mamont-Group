const Router = require('express');
const workoutExercisesController = require('../controllers/workoutExercisesController');
const checkRole = require('../middleware/checkRoleMiddleware');

const router = new Router();

router.post('/', workoutExercisesController.create);
router.get('/', workoutExercisesController.getAll);
router.delete('/:id', workoutExercisesController.delete);

module.exports = router;
