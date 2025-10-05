const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");

const sequelize = require("./config/database");
const Theme = require("./models/Theme");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: "mysecretkey123", 
    resave: false,
    saveUninitialized: false,
  })
);

// DB connection
(async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// static files
app.use(express.static("public"));
// Default layout file
app.use(expressLayouts);
app.set("layout", "layout");

// view routes
const viewRoutes = require('./routes/view');
app.use('/', viewRoutes);

// Routes
const quizRoutes = require("./routes/quiz");
const statisticsRoutes = require("./routes/statistics");
const questionsRoutes = require("./routes/questions");
const authRoutes = require("./routes/auth");

app.use("/api/quiz", quizRoutes);
app.use("/api/statistics", statisticsRoutes);
app.use("/api/questions", questionsRoutes);
app.use("/auth", authRoutes);

// app.get('/', (req, res) => {
//     res.send('Express + Sequelize + MySQL is running!');
// });

const themes = ["javaScript", "nodejs", "nestjs", "reactjs", "nextjs"];

(async () => {
  for (const name of themes) {
    await Theme.findOrCreate({ where: { name } });
  }
})();

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
