const { Theme, Question } = require("../models");

exports.home = (req, res) => {
  res.render("home", {
    title: "Home",
    message: "Welcome to JSQuiz Pro! 🎉"
  });
};

// themes pages
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

exports.manage_questions = (req, res)=>{
  res.render("manage_questions", {
     title: "Questions",
  })
};

// exports.questions = async (req, res)=>{
//   try {
//     const questions  = await Question.findAll();
//     res.render("manage_questions", {
//       title: "Question",
//       questions
//     })
//   } catch (error) {
//     console.error("Error fetching questions:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };

exports.questions = async (req, res) => {
  try {
    const questions = await Question.findAll();
    console.log("questions : ",questions)
    res.render("manage_questions", { 
      title: "Questions",
      questions : questions
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).send("Internal Server Error");
  }
};
