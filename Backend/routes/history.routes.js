const express = require('express');
const router = express.Router();

const { historyController } = require('../controllers');

router.get('/', historyController.getHistory);
router.delete('/delete/:id', historyController.deleteHistory);
router.post('/report', historyController.generateReport);

module.exports = router;