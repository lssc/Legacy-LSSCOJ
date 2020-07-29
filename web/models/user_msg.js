module.exports = (sequelize, DataTypes) => sequelize.define('user_msg', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  sender: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  receiver_id: {
    type: DataTypes.INTEGER.UNSIGNED,
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
