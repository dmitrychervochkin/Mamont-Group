const Router = require('express');
const exercisesController = require('../../controllers/exercisesController/exercisesController');
const checkRole = require('../../middleware/checkRoleMiddleware');

const router = new Router();

router.post('/', exercisesController.create);
router.get('/', exercisesController.getAll);
router.get('/:id', exercisesController.getOne);
router.patch('/:id', exercisesController.update);
router.delete('/:id', exercisesController.delete);

module.exports = router;
