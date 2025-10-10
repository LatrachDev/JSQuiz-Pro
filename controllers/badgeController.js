const { QuizSession, Question, Theme, UserBadge } = require("../models");

exports.setUserBadge = async (req, res) => {
    try {
        const { userId } = req.params;

        // Get all themes
        const themes = await Theme.findAll();
        if (themes.length === 0) return res.json({ badge: "Beginner", message: "No themes found" });

        // Calculate maxScore (total questions )
        const maxScore = await Question.count();

        // Calculate user's total score across all themes
        const userSessions = await QuizSession.findAll({
            where: { user_id: userId }
        });

        if (!userSessions.length) return res.json({ badge: "Beginner", userScore: 0, maxScore });

        const userScore = userSessions.reduce((acc, session) => acc + session.score, 0);

        // Determine badge
        let badge = "";
        if (userScore < maxScore / 2) badge = "Beginner";
        else if (userScore < (3 * maxScore) / 4) badge = "Intermediate";
        else badge = "Expert";

        // create or update badge
        await UserBadge.upsert({
            user_id: userId,
            badge_name: badge,
            awarded_at: new Date()
        });

        res.json({ badge, userScore, maxScore });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};