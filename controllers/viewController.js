const { Theme, Question } = require("../models");

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

exports.manage_questions = async (req, res)=>{
  try {
    const themes = await Theme.findAll(); // récupère tous les thèmes
    res.render("manage_questions", {
      title: "Questions",
      themes, // <-- tu envoies les thèmes à la vue
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur lors du chargement des thèmes");
  }
};

exports.questions = async (req, res) => {
  try {
    const themes = await Theme.findAll();
    const questions = await Question.findAll();
    console.log("questions : ",questions)
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
