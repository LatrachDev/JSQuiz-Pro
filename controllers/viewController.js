const { Theme, User, QuizSession, Question } = require("../models");
// const { Theme, Question } = require("../models");
const { getDashdoardStats, getUsersWithScoreInTheme } = require("./statisticsController");

exports.home = (req, res) => {
  res.render("home", {
    title: "Home",
    message: "Welcome to JSQuiz Pro! 🎉"
  });
};

// ========================== quiz views ==================================
// themes page
// themes
exports.themes = async (req, res) => {
  try {
    const themes = await Theme.findAll();
    res.render("themes", {
      title: "Themes",
      themes,
    });
  } catch (error) {
    console.error("Error fetching themes:", error);
    res.status(500).send("Internal Server Error");
  }
};

// quiz page
exports.quiz = async (req, res) => {
  try {
    const themeId = req.params.themeId;
    const theme = await Theme.findByPk(themeId);

    const user = req.session.user;
    res.render("quiz", {
      title: "Themes",
      user,
      theme
    });
  } catch (error) {
    console.error("Error getting user:", error);
  }
}
//render the manage questions page
exports.questions = async (req, res) => {
  try {
    const themes = await Theme.findAll();
    const questions = await Question.findAll();

    res.render("manage_questions", { 
      title: "Questions",
      questions,
      themes
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).send("Internal Server Error");
  }
};

// result page
exports.result = async (req, res) => {
  try {
    const themeId = req.params.themeId;
    const theme = await Theme.findByPk(themeId);
    const user = await User.findByPk(req.session.user.id);
    const session = await QuizSession.findOne({
      where: { user_id: user.id, theme_id: themeId }
    });

    const score = session ? session.score : 0;
    const totalQuestions = await Question.count({ where: { theme_id: themeId } });

    res.render("result", {
      title: "Themes",
      user,
      theme,
      score,
      totalQuestions
    });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).send("Internal Server Error");
  }
};
//render the admin dashboard
exports.getDashboardAdmin = async (req, res) => {
  try {
    const stats = await getDashdoardStats();
    const userswithScores = await getUsersWithScoreInTheme();

    res.render("dashboard_admin", {
      title: "DashboardAdmin",
      stats,
      userswithScores
    })
  } catch (error) {
    console.error("error occurred while loading the Admin dashboard :", error);
    res.status(500).send("server error occurred while loading the Admin dashboard ");
  }
}
