const { Question } = require("../models");
const { Sequelize } = require("sequelize");

exports.getQuestionsByTheme = async (req, res) => {
    try {
        const themeId = req.params.themeId;

        const questions = await Question.findAll({
            where: { theme_id: themeId },
            attributes: ["id", "question_text", "options", "multiple"],
              order: [ [ Sequelize.literal('RAND()') ] ] // shuffle
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
