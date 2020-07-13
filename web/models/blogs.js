/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('blogs', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    content: {
      type: 'MEDIUMTEXT',
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
    content_md: {
      type: 'MEDIUMTEXT',
      allowNull: false
    },
    zan: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_hidden: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    type: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "B"
    },
    is_draft: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: "0"
    }
  }, {
    sequelize,
    tableName: 'blogs'
  });
};