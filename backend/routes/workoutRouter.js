const Router = require('express');
const workoutController = require('../controllers/workoutController/workoutController');
const checkRole = require('../middleware/checkRoleMiddleware');

const router = new Router();

router.post('/', workoutController.create);
router.get('/', workoutController.getAll);
router.get('/:id', workoutController.getOne);
router.patch('/:id', workoutController.update);
router.delete('/:id', workoutController.delete);

module.exports = router;
