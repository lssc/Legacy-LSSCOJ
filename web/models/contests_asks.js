module.exports = (sequelize, DataTypes) => sequelize.define('contests_asks', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  contest_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  post_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  reply_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  is_hidden: {
    type: DataTypes.INTEGER(1),
    allowNull: true,
    defaultValue: '0',
  },
}, {
  sequelize,
  tableName: 'contests_asks',
});
