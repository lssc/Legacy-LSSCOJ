/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('important_blogs', {
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'important_blogs'
  });
};
