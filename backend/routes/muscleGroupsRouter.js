const Router = require('express');
const muscleGroupsController = require('../controllers/muscleGroupsController');
const checkRole = require('../middleware/checkRoleMiddleware');
const ROLE = require('../constants/ROLE');

const router = new Router();

router.post('/', checkRole(ROLE.ADMIN), muscleGroupsController.create);
router.get('/', muscleGroupsController.getAll);
router.patch('/:id', checkRole(ROLE.ADMIN), muscleGroupsController.update);
router.delete('/:id', checkRole(ROLE.ADMIN), muscleGroupsController.delete);

module.exports = router;
