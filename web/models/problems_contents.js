/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('problems_contents', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    statement: {
      type: 'MEDIUMTEXT',
      allowNull: false,
    },
    statement_md: {
      type: 'MEDIUMTEXT',
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'problems_contents',
  });
};
