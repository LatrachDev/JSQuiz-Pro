exports.home = (req, res) => {
  res.render("home", {
    title: "Home",
    message: "Welcome to JSQuiz Pro! 🎉"
  });
};