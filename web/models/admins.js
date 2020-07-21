module.exports = (sequelize, DataTypes) => sequelize.define('admins', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
}, {
  sequelize,
  tableName: 'admins',
});
