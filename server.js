const express = require('express');
const sequelize = require('./config/database');
const Theme = require("./models/Theme");
// import Theme from ("./models/Theme");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB connection
(async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

// Routes
const quizRoutes = require("./routes/quiz");
const statisticsRoutes = require("./routes/statistics");

app.use("/api/quiz", quizRoutes);
app.use("/api/statistics", statisticsRoutes);


app.listen(3000, () => {
    console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
app.get('/', (req, res) => {
    res.send('Express + Sequelize + MySQL is running!');
});

//
const themes = ['javaScript','nodejs','nestjs','reactjs','nextjs'];

(async () => {
  for (const name of themes) {
    await Theme.findOrCreate({ where: { name } });
  }
})();

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});