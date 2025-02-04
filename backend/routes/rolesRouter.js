const Router = require('express');
const checkRole = require('../middleware/checkRoleMiddleware');
const rolesController = require('../controllers/rolesController');

const router = new Router();

router.post('/', rolesController.create);
router.get('/', rolesController.getAll);
router.patch('/:id', rolesController.update);
router.delete('/:id', rolesController.delete);

module.exports = router;
