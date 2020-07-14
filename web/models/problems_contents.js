module.exports = (sequelize, DataTypes) => sequelize.define('problems_contents', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  statement: {
    type: 'MEDIUMTEXT',
    allowNull: false,
  },
  statement_md: {
    type: 'MEDIUMTEXT',
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'problems_contents',
});
