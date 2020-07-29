module.exports = (sequelize, DataTypes) => sequelize.define('problems_tags', {
  problem_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  tag: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'problems_tags',
});
