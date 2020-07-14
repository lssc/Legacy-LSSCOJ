module.exports = (sequelize, DataTypes) => sequelize.define('blogs_tags', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  blog_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tag: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'blogs_tags',
});
