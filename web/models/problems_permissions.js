/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('problems_permissions', {
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
};
