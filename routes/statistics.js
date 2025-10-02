const express = require('express');
const router = express.Router();
const { getTopUsersInTheme } = require('../controllers/statisticsController');

router.get('/theme/:themeId/top-users', getTopUsersInTheme);
router.get()

module.exports = router;
