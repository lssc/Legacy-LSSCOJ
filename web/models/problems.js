/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('problems', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    is_hidden: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: "0"
    },
    submission_requirement: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    hackable: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: "0"
    },
    extra_config: {
      type: DataTypes.STRING(500),
      allowNull: false,
      defaultValue: "{\"view_content_type\":\"ALL\",\"view_details_type\":\"ALL\"}"
    },
    zan: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ac_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "0"
    },
    submit_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "0"
    }
  }, {
    sequelize,
    tableName: 'problems'
  });
};
