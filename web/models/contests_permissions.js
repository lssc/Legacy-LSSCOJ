/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('contests_permissions', {
    username: {
      type: DataTypes.STRING(20),
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
    tableName: 'contests_permissions',
  });
};
