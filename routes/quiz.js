// routes/quiz.js
const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");
const quizSessionController = require("../controllers/quizSessionController");

router.get("/theme/:themeId/questions", quizController.getQuestionsByTheme);
router.post("/start", quizSessionController.startSession);
router.post("/answer", quizController.saveAnswer);
router.post("/score", quizController.calculateScore);
router.get("/user/:userId/theme/:themeId/history", quizController.getUserHistory);
router.get("/user/:userId/theme/:themeId/score", quizSessionController.getUserScore);

module.exports = router;