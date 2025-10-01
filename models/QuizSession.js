const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const QuizSession = sequelize.define('QuizSession', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  theme_id: {
    type: DataTypes.INTEGER, allowNull: false, unique: "user_theme_unique"
  },
  score: { type: DataTypes.INTEGER, defaultValue: 0 },
  status: { type: DataTypes.ENUM('en_cours', 'termine'), defaultValue: 'en_cours' },
  started_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  ended_at: { type: DataTypes.DATE }
}, {
  tableName: 'quiz_sessions',
  timestamps: false
});

module.exports = QuizSession;