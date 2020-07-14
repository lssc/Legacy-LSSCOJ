/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('submissions', {
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
    contest_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
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
    language: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    tot_size: {
      type: DataTypes.INTEGER,
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
    result_error: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    used_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0',
    },
    used_memory: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0',
    },
    is_hidden: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
    },
    status_details: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'submissions',
  });
};
