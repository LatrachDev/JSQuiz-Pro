const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserBadge = sequelize.define('UserBadge', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  badge_id: { type: DataTypes.INTEGER, allowNull: false },
  awarded_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'user_badges',
  timestamps: false
});

module.exports = UserBadge;