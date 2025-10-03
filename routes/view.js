const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');

router.get('/', viewController.home);
router.get('/themes',isAuthenticated, viewController.themes);
router.get('/quiz/:themeId', isAuthenticated, viewController.quiz);

module.exports = router;
