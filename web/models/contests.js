/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('contests', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    last_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    player_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    extra_config: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    zan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'contests',
  });
};
