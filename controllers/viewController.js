const { Theme } = require("../models");

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