const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

router.get('/', viewController.home);
router.get('/themes', viewController.themes);

module.exports = router;
