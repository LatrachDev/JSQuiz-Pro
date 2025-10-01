const { Question, UserAnswer } = require("../models");
const { Sequelize } = require("sequelize");

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

        // create or update answer
        await UserAnswer.upsert({
            user_id: userId,
            question_id: questionId,
            theme_id: themeId,
            answers: JSON.stringify(answers)
        });

        res.json({
            success: true,
            message: "Answer saved or updated successfully"
        });

    } catch (err) {
        console.error("Error saving answer:", err);
        res.status(500).json({ success: false, message: "Failed to save answer" });
    }
};
