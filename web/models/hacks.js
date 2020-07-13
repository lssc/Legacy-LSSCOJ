/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('hacks', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    problem_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    contest_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    submission_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    hacker: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    owner: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    input: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    input_type: {
      type: DataTypes.CHAR(20),
      allowNull: false
    },
    submit_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    judge_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    success: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    details: {
      type: 'BLOB',
      allowNull: false
    },
    is_hidden: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'hacks'
  });
};
