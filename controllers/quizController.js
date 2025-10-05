const { Question, UserAnswer, QuizSession } = require("../models");
const { Sequelize } = require("sequelize");
const quizService = require("../services/quizService");

// function to get theme questions
exports.getQuestionsByTheme = async (req, res) => {
    try {
        const themeId = req.params.themeId;

        const questions = await Question.findAll({
            where: { theme_id: themeId },
            attributes: ["id", "question_text", "options", "multiple"],
            order: [[Sequelize.literal('RAND()')]] // shuffle
        });

        res.json({
            success: true,
            count: questions.length,
            questions
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to fetch questions" });
    }
};

// function to save user answer
exports.saveAnswer = async (req, res) => {
    try {
        const { userId, questionId, themeId, answers } = req.body;

        if (!userId || !questionId || !themeId || !answers) {
            return res.status(400).json({ success: false, message: "Missing fields" });
        }

        // Save or update user answer
        await UserAnswer.upsert({
            user_id: userId,
            question_id: questionId,
            theme_id: themeId,
            answers: answers
        }, {
            returning: false
        });

        return res.json({
            success: true,
            message: "Answer saved or updated successfully"
        });

    } catch (err) {
        console.error("Error saving answer:", err);
        res.status(500).json({ success: false, message: "Failed to save answer" });
    }
};

// function to calculate and save score
exports.calculateScore = async (req, res) => {
    try {
        const { userId, themeId } = req.body;

        if (!userId || !themeId) {
            return res.status(400).json({ success: false, message: "userId and themeId are required" });
        }

        // get user answers at the theme
        const userAnswers = await UserAnswer.findAll({
            where: { user_id: userId },
            include: [{
                model: Question,
                where: { theme_id: themeId },
            }]
        });

        let score = 0;

        // calculate score
        for (const ua of userAnswers) {
            const question = ua.Question;
            if (quizService.checkAnswers(question, ua.answers)) {
                score++;
            }
        }

        // update session score
        await QuizSession.update(
            { score, status: "termine" },
            { where: { user_id: userId, theme_id: themeId } }
        );

        res.json({
            success: true,
            score,
            total: userAnswers.length
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to calculate score" });
    }
};

// function to return correct answer or not
exports.correct = async (req, res) => {
    try {
        const { questionId, answers } = req.body;
        // get question by id
        const question = await Question.findByPk(questionId);
        const correctAnswers = question.options
            .filter(option => option.correct)
            .map(option => option.text);

        if (!question) {
            return res.status(404).json({ success: false, message: "Question not found" });
        }
        const correct = quizService.checkAnswers(question, answers);

        res.json({
            success: true,
            correct,
            correctAnswers
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to validate answer" });
    }
};

// function to get user answers in a theme
exports.getUserQuizAnswers = async (req, res) => {
    try {
        const { userId, themeId } = req.params;

        if (!userId || !themeId) {
            return res.status(400).json({ success: false, message: "userId and themeId are required" });
        }

        // Fetch all user answers for this theme
        const userAnswers = await UserAnswer.findAll({
            where: { user_id: userId },
            include: [{
                model: Question,
                where: { theme_id: themeId }
            }]
        });

        if (!userAnswers.length) {
            return res.status(404).json({ success: false, message: "No answers found for this user in this theme" });
        }

        // Map answers with correctness
        const answersWithResult = userAnswers.map(ua => {
            const question = ua.Question;
            const correctAnswers = question.options.filter(o => o.correct).map(o => o.text);
            const correct = quizService.checkAnswers(question, ua.answers);
            const questionOptions = question.options.map(o => o.text);

            return {
                questionId: question.id,
                questionText: question.question_text,
                questionOptions,
                userAnswers: ua.answers,
                correct,
                correctAnswers
            };
        });

        res.json({
            success: true,
            answers: answersWithResult
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to fetch user answers" });
    }
};
