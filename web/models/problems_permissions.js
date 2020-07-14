module.exports = (sequelize, DataTypes) => sequelize.define('problems_permissions', {
  username: {
    type: DataTypes.STRING(20),
    allowNull: false,
    primaryKey: true,
  },
  problem_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
}, {
  sequelize,
  tableName: 'problems_permissions',
});
