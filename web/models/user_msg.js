/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user_msg', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    sender: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    receiver: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING(5000),
      allowNull: false,
    },
    send_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    read_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'user_msg',
  });
};
