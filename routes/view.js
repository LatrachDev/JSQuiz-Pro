const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

router.get('/', viewController.home);
router.get("/manage_questions", viewController.questions);
router.get("/dashboard_admin", viewController.getDashboardAdmin);

module.exports = router;
