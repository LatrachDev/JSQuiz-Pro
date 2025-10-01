const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Question = sequelize.define('Question', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    theme_id: { type: DataTypes.INTEGER, allowNull: false },
    question_text: { type: DataTypes.TEXT, allowNull: false },
    options: { type: DataTypes.JSON, allowNull: false },
    multiple: { type: DataTypes.BOOLEAN, defaultValue: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    tableName: 'questions',
    timestamps: false
});

module.exports = Question;