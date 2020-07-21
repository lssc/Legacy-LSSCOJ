module.exports = (sequelize, DataTypes) => sequelize.define('problems_samples', {
  problem_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
