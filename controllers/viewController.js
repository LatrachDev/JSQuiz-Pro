const { Theme, User, QuizSession, Question } = require("../models");

exports.home = (req, res) => {
  res.render("home", {
    title: "Home",
    message: "Welcome to JSQuiz Pro! 🎉"
  });
};

// ========================== quiz views ==================================
// themes page
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