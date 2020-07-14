module.exports = (sequelize, DataTypes) => sequelize.define('contests_submissions', {
  contest_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  submitter: {
    type: DataTypes.STRING(20),
    allowNull: false,
    primaryKey: true,
  },
  problem_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  submission_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  penalty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'contests_submissions',
});
