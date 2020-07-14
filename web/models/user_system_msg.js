module.exports = (sequelize, DataTypes) => sequelize.define('user_system_msg', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING(300),
    allowNull: false,
  },
  receiver: {
    type: DataTypes.STRING(20),
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
  tableName: 'user_system_msg',
});
