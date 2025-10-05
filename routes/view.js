const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');

router.get('/', viewController.home);
router.get('/themes',isAuthenticated, viewController.themes);
router.get('/quiz/:themeId', isAuthenticated, viewController.quiz);
router.get('/result/:themeId', isAuthenticated, viewController.result);
router.get("/manage_questions", viewController.questions);
router.get("/dashboard_admin", viewController.getDashboardAdmin);

module.exports = router;
