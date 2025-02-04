const Router = require('express');
const userPatternController = require('../../controllers/patternsController/userPatternController');

const router = new Router();

router.post('/', userPatternController.create);
router.get('/', userPatternController.getAll);
router.get('/:id', userPatternController.getOne);
router.patch('/:id', userPatternController.update);
router.delete('/:id', userPatternController.delete);

module.exports = router;