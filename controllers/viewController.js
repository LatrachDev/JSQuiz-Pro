const { Theme, User, QuizSession, sequelize } = require("../models");
const statisticsController = require("../controllers/statisticsController");

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

exports.login = (req, res) => {
  res.render("auth/login", {
    title: "Login"
  });
};

exports.userDashboard = async (req, res) => {
  try {
    // // Get all themes
    // const themes = await Theme.findAll();

    // // Get user's quiz sessions with scores
    // const userQuizzes = await QuizSession.findAll({
    //   where: { userId: req.user.id },
    //   include: [{ model: Theme }],
    //   order: [['createdAt', 'DESC']]
    // });

    // // Calculate user scores for each theme
    // const themesWithScores = themes.map(theme => {
    //   const themeQuizzes = userQuizzes.filter(quiz => quiz.Theme.id === theme.id);
    //   const avgScore = themeQuizzes.length > 0
    //     ? Math.round(themeQuizzes.reduce((acc, quiz) => acc + quiz.score, 0) / themeQuizzes.length)
    //     : 0;
      
    //   return {
    //     ...theme.toJSON(),
    //     userScore: avgScore
    //   };
    // });

    // Get top 5 players
    // const topPlayers = await User.findAll({
    //   attributes: [
    //     'id', 
    //     'username',
    //     [sequelize.fn('AVG', sequelize.col('QuizSessions.score')), 'avgScore']
    //   ],
    //   include: [{
    //     model: QuizSession,
    //     attributes: []
    //   }],
    //   group: ['User.id'],
    //   order: [[sequelize.fn('AVG', sequelize.col('QuizSessions.score')), 'DESC']],
    //   limit: 5
    // });

    // Get user's recent quizzes
    // const userRecentQuizzes = userQuizzes
    //   .slice(0, 5)
    //   .map(quiz => ({
    //     theme: quiz.Theme.name,
    //     date: quiz.createdAt.toLocaleDateString(),
    //     score: quiz.score,
    //     correctAnswers: quiz.correctAnswers,
    //     totalQuestions: quiz.totalQuestions
    //   }));

    // res.render("dashboard_user");
    console.log(req.user);
    res.render("dashboard_user", {
      user: req.user
      
      // themes: themesWithScores,
      // topPlayers: topPlayers.map(player => ({
      //   username: player.username,
      //   totalScore: Math.round(player.dataValues.avgScore || 0)
      // })),
      // userRecentQuizzes
    });
  } catch (error) {
    console.error("Error in user dashboard:", error);
    res.status(500).send("Internal Server Error");
  }
};