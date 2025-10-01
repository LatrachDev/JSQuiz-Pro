// routes/quiz.js
const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");
const quizSessionController = require("../controllers/quizSessionController");

router.get("/theme/:themeId/questions", quizController.getQuestionsByTheme);
router.post("/start", quizSessionController.startSession);
router.post("/answer", quizController.saveAnswer);
router.post("/score", quizController.calculateScore);

module.exports = router;