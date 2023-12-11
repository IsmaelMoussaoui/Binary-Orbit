const express = require('express');
const router = express.Router();
const machinesController = require('../controllers/machinesController');

router.post('/spawn', machinesController.spawnContainer);

module.exports = router;
