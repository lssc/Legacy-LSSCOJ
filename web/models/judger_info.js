/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('judger_info', {
    judger_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    ip: {
      type: DataTypes.CHAR(20),
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'judger_info',
  });
};
