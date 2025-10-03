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
    res
      .status(500)
      .json({ message: "error while calculating averages" });
  }
};

//total users
exports.totalUsers = async (req, res) => {
  try {
    const totalUsers = await User.count();
    return res.json({ totalUsers });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while counting total of users" });
  }
};

//total questions
exports.totalQuestions = async (req, res) => {
  try {
    const totalQuestions = await Question.count();
    return res.json({ totalQuestions });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while counting total of questions " });
  }
};

//total theme
exports.totalThemes = async (req, res) => {
  try {
    const totalThemes = await Theme.count();
    return res.json({ totalThemes });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while counting total of themes " });
  }
};