const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');

// router.get('/', viewController.home);
router.get('/themes',isAuthenticated, viewController.themes);
router.get('/quiz/:themeId', isAuthenticated, viewController.quiz);
router.get('/result/:themeId', isAuthenticated, viewController.result);
router.get("/manage_questions", isAdmin, isAuthenticated,viewController.questions);
router.get("/dashboard_admin", isAdmin, isAuthenticated, viewController.getDashboardAdmin);


// Protected routes
router.get('/dashboard', isAuthenticated, viewController.userDashboard);
// router.get('/themes', isAuthenticated, viewController.themes);

module.exports = router;
