const { Theme, Question } = require("../models");
const { getDashdoardStats, getUsersWithScoreInTheme } = require("./statisticsController");

exports.home = (req, res) => {
  res.render("home", {
    title: "Home",
    message: "Welcome to JSQuiz Pro! 🎉"
  });
};

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
