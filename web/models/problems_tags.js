module.exports = (sequelize, DataTypes) => sequelize.define('problems_tags', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
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
