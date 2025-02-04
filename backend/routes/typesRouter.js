const Router = require('express');
const typesController = require('../controllers/typesController');
const checkRole = require('../middleware/checkRoleMiddleware');
const ROLE = require('../constants/ROLE');

const router = new Router();

router.post('/', checkRole(ROLE.ADMIN), typesController.create);
router.get('/', typesController.getAll);
router.patch('/:id', checkRole(ROLE.ADMIN), typesController.update);
router.delete('/:id', checkRole(ROLE.ADMIN), typesController.delete);

module.exports = router;
