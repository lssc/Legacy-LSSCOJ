/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('click_zans', {
    type: {
      type: DataTypes.CHAR(2),
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    target_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    val: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "1"
    }
  }, {
    sequelize,
    tableName: 'click_zans'
  });
};
