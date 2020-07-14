/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('custom_test_submissions', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    problem_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    submit_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    submitter: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    judge_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    result: {
      type: 'BLOB',
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    status_details: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'custom_test_submissions',
  });
};
