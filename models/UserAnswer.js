const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserAnswer = sequelize.define('UserAnswer', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  question_id: { type: DataTypes.INTEGER, allowNull: false },
  answers: { type: DataTypes.JSON, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'user_answers',
  timestamps: false
});

module.exports = UserAnswer;