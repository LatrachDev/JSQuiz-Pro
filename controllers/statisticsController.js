const { QuizSession, User, Theme, Question } = require("../models");
const { Sequelize } = require("sequelize");

// Get top 5 users in a theme based on score
exports.getTopUsersInTheme = async (req, res) => {
  try {
    const { themeId } = req.params;

    const topUsers = await QuizSession.findAll({
      where: { theme_id: themeId },
      include: [
        { model: User, attributes: ["id", "username"] },
        { model: Theme, attributes: ["id", "name"] },
      ],
      order: [["score", "DESC"]],
      limit: 5,
    });

    res.json({
      success: true,
      data: topUsers,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch top users" });
  }
};

//average score in a theme
exports.avgScoreIntheme = async (req, res) => {
  try {
    const moyennes = await QuizSession.findAll({
      attributes: [
        "theme_id",
        [Sequelize.fn("AVG", Sequelize.col("score")), "moyenne_scores"],
      ],
      group: ["theme_id"],
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error while calculating averages by theme", error);
    res.status(500).json({ message: "error while calculating averages" });
  }
};

//calcul des statistiques du dashboard admin
exports.getDashdoardStats = async () => {
  try {
    const totalUsers = await User.count();
    const totalQuestions = await Question.count();
    const totalThemes = await Theme.count();

    const avgScore = await QuizSession.findAll({
      attributes: [[Sequelize.fn("AVG", Sequelize.col("score")), "avgScore"]],
    });

    const averageScore = parseFloat(avgScore[0].get("avgScore")) || 0;
    return {
      totalUsers,
      totalQuestions,
      totalThemes,
      averageScore: averageScore.toFixed(2),
    };
  } catch (error) {
    console.error("error occurred while generating statistics :", error);
    throw new Error("Failed to generate dashboard statistics");
  }
};

exports.getUsersWithScoreInTheme = async () => {
  const users = await QuizSession.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "username", "role"],
        where: { role: { [Sequelize.Op.ne]: 'admin' } }
      },
      {
        model: Theme,
        attributes: ["id", "name"]
      },
    ],
    order: [["started_at", "DESC"]],
    attributes: ["score", "started_at"],
  });

  return users.map(quiz => ({
    username: quiz.User.username,
    themeName: quiz.Theme.name,
    themeId: quiz.Theme.id,
    score: quiz.score,
    date: new Date(quiz.started_at).toDateString(),
  }));
}
