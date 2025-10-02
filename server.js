const express = require("express");
const sequelize = require("./config/database");
const Theme = require("./models/Theme");
require("dotenv").config();
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB connection
(async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// Routes
const quizRoutes = require("./routes/quiz");
const statisticsRoutes = require("./routes/statistics");
const questionsRoutes = require("./routes/questions");

app.use("/api/quiz", quizRoutes);
app.use("/api/statistics", statisticsRoutes);
app.use("/api/questions", questionsRoutes);

// app.get('/', (req, res) => {
//     res.send('Express + Sequelize + MySQL is running!');
// });

//
const themes = ["javaScript", "nodejs", "nestjs", "reactjs", "nextjs"];

(async () => {
  for (const name of themes) {
    await Theme.findOrCreate({ where: { name } });
  }
})();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
