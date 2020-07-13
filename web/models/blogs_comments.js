/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('blogs_comments', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    post_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    poster: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    zan: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reply_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'blogs_comments'
  });
};
