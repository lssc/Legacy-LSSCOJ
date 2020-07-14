module.exports = (sequelize, DataTypes) => sequelize.define('important_blogs', {
  blog_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'important_blogs',
});
