const Router = require('express');
const patternController = require('../../controllers/patternsController/patternController');

const router = new Router();

router.post('/', patternController.create);
router.get('/', patternController.getAll);
router.get('/:id', patternController.getOne);
router.patch('/:id', patternController.update);
router.delete('/:id', patternController.delete);

module.exports = router;