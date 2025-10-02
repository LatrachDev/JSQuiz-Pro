const { QuizSession, User, Theme } = require("../models");

// Get top 5 users in a theme based on score
exports.getTopUsersInTheme = async (req, res) => {
    try {
        const { themeId } = req.params;

        const topUsers = await QuizSession.findAll({
            where: { theme_id: themeId },
            include: [
                { model: User, attributes: ["id", "username"] },
                { model: Theme, attributes: ["id", "name"] }
            ],
            order: [["score", "DESC"]],
            limit: 5
        });

        res.json({
            success: true,
            data: topUsers
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to fetch top users" });
    }
};