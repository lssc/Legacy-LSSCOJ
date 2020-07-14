module.exports = (sequelize, DataTypes) => sequelize.define('best_ac_submissions', {
  problem_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  submitter: {
    type: DataTypes.STRING(20),
    allowNull: false,
    primaryKey: true,
  },
  submission_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  used_time: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  used_memory: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tot_size: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  shortest_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  shortest_used_time: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  shortest_used_memory: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  shortest_tot_size: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'best_ac_submissions',
});
