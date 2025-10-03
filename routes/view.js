const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

router.get('/', viewController.home);
router.get('/themes', viewController.themes);
// router.get("/manage_questions", viewController.manage_questions)
router.get("/manage_questions", viewController.questions);

module.exports = router;
