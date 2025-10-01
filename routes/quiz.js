// routes/quiz.js
const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");

router.get("/theme/:themeId/questions", quizController.getQuestionsByTheme);

module.exports = router;