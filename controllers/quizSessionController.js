const { QuizSession, Theme } = require("../models");

exports.startSession = async (req, res) => {
    try {
        const { userId, themeId } = req.body;

        if (!userId || !themeId) {
            return res.status(400).json({ success: false, message: "userId and themeId are required" });
        }

        // update session or create a new one
        const [session, created] = await QuizSession.upsert({
            user_id: userId,
            theme_id: themeId,
            score: 0,
            status: "en_cours"
        }, { returning: true });

        res.json({
            success: true,
            message: created ? "New session started" : "Session already exists",
            session
        });

    } catch (err) {
        console.error("Error starting session:", err);
        res.status(500).json({ success: false, message: "Failed to start session" });
    }
};

// function getting user score in a theme
exports.getUserScore = async (req, res) => {
    try {
        const { userId, themeId } = req.params;

        const session = await QuizSession.findOne({
            where: { user_id: userId, theme_id: themeId },
            include: [{ model: Theme, attributes: ["id", "name"] }]
        });

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "No quiz session found for this user and theme"
            });
        }

        res.json({
            success: true,
            userId,
            theme: session.Theme,
            score: session.score,
            status: session.status
        });

    } catch (err) {
        console.error("Error fetching user score:", err);
        res.status(500).json({ success: false, message: "Failed to fetch user score" });
    }
};
