const Router = require('express');
const calendarTypeEventsController = require('../../controllers/calendarEventsController/calendarTypeEventsController');

const router = new Router();

router.post('/', calendarTypeEventsController.create);
router.get('/', calendarTypeEventsController.getAll);
router.patch('/:id', calendarTypeEventsController.update);
router.delete('/:id', calendarTypeEventsController.delete);

module.exports = router;
