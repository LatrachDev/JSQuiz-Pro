const express = require('express');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();

// DB connection
(async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

app.get('/', (req, res) => {
    res.send('Express + Sequelize + MySQL is running!');
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});
