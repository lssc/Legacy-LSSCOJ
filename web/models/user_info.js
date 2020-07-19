module.exports = (sequelize, DataTypes) => sequelize.define('user_info', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  password: {
    type: DataTypes.CHAR(32),
    allowNull: false,
  },
  contest_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '1500',
  },
  ac_num: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  register_time: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: 'CURRENT_TIMESTAMP',
  },
  remember_token: {
    type: DataTypes.CHAR(60),
    allowNull: false,
  },
  quote: {
    type: DataTypes.STRING(200),
    allowNull: false,
    defaultValue: '',
  },
}, {
  sequelize,
  tableName: 'user_info',
});
