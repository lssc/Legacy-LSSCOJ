module.exports = (sequelize, DataTypes) => sequelize.define('problems_samples', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  problem_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  input: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  output: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'problems_samples',
});
