const express = require('express');

const surgeonsController = require('../controllers/surgeonsController');

const router = express.Router();

router.get('/', surgeonsController.getSurgeons);

module.exports = router;
