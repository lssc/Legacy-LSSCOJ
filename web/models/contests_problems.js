module.exports = (sequelize, DataTypes) => sequelize.define('contests_problems', {
  problem_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  contest_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
}, {
  sequelize,
  tableName: 'contests_problems',
});
