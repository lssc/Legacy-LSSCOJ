/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('problems_tags', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    problem_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tag: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'problems_tags',
  });
};
