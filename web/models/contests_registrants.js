/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('contests_registrants', {
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
    },
    user_rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contest_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    has_participated: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'contests_registrants',
  });
};
