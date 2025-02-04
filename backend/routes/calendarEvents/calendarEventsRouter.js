const Router = require('express');
const calendarEventsController = require('../../controllers/calendarEventsController/calendarEventsController');

const router = new Router();

router.post('/', calendarEventsController.create);
router.get('/', calendarEventsController.getAll);
router.patch('/:id', calendarEventsController.update);
router.delete('/:id', calendarEventsController.delete);

module.exports = router;
