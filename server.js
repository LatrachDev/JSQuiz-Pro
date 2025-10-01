const express = require('express');
const sequelize = require('./config/database');
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
app.use("/api/quiz", quizRoutes);


app.listen(3000, () => {
    console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
});