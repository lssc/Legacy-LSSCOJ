module.exports = (sequelize, DataTypes) => sequelize.define('contests_registrants', {
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
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
