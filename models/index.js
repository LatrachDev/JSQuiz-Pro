const User = require('./User');
const Theme = require('./Theme');
const Badge = require('./Badge');
const Question = require('./Question');
const QuizSession = require('./QuizSession');
const UserAnswer = require('./UserAnswer');
const UserBadge = require('./UserBadge');

// Associations
Theme.hasMany(Question, { foreignKey: 'theme_id' });
Question.belongsTo(Theme, { foreignKey: 'theme_id' });

User.hasMany(QuizSession, { foreignKey: 'user_id' });
QuizSession.belongsTo(User, { foreignKey: 'user_id' });

Theme.hasMany(QuizSession, { foreignKey: 'theme_id' });
QuizSession.belongsTo(Theme, { foreignKey: 'theme_id' });

User.hasMany(UserAnswer, { foreignKey: 'user_id' });
UserAnswer.belongsTo(User, { foreignKey: 'user_id' });

Question.hasMany(UserAnswer, { foreignKey: 'question_id' });
UserAnswer.belongsTo(Question, { foreignKey: 'question_id' });

User.belongsToMany(Badge, { through: UserBadge, foreignKey: 'user_id' });
Badge.belongsToMany(User, { through: UserBadge, foreignKey: 'badge_id' });

module.exports = {
    User,
    Theme,
    Badge,
    Question,
    QuizSession,
    UserAnswer,
    UserBadge
};