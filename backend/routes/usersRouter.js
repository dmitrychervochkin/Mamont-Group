const Router = require('express');
const router = new Router();
const usersController = require('../controllers/userController/usersController');
const authMiddleWare = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');
const ROLE = require('../constants/ROLE');

router.post('/registration', usersController.registration);
router.post('/login', usersController.login);
router.get('/auth', authMiddleWare, usersController.check);
router.get('/', usersController.getAll);
router.get('/:id', usersController.getOne);
router.patch('/reset_password', usersController.resetPassword);
router.patch('/update_user/:id', usersController.update);
router.delete('/:id', checkRole(ROLE.ADMIN), usersController.delete);

module.exports = router;
