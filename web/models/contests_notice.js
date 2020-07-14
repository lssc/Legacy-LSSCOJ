module.exports = (sequelize, DataTypes) => sequelize.define('contests_notice', {
  contest_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'contests_notice',
});
