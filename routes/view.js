const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');
const authMiddleware = require('../middlewares/auth');

// Public routes
router.get('/', viewController.home);

// Protected routes
router.get('/dashboard', authMiddleware.isAuthenticated, viewController.userDashboard);
router.get('/themes', authMiddleware.isAuthenticated, viewController.themes);

module.exports = router;
