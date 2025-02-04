const Router = require('express');
const exercisesInfoController = require('../../controllers/exercisesController/exercisesInfoController');
// const checkRole = require('../../middleware/checkRoleMiddleware');

const router = new Router();

router.post('/', exercisesInfoController.create);
router.get('/', exercisesInfoController.getAll);
router.get('/:id', exercisesInfoController.getOne);
router.patch('/:id', exercisesInfoController.update);
router.delete('/:id', exercisesInfoController.delete);

module.exports = router;
