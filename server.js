const express = require('express');
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require('./config/database');
const helmet = require("helmet");
require('dotenv').config();

const app = express();
app.set('views', './views');
app.set('view engine', 'ejs');

// security
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessions
const store = new SequelizeStore({ db: sequelize });
app.use(
  session({
    secret: process.env.SESSION_SECRET || "super_secret",
    store: store,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 },
  })
);
store.sync();

// Routes
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
