module.exports = (sequelize, DataTypes) => sequelize.define('problems', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  is_hidden: {
    type: DataTypes.INTEGER(1),
    allowNull: false,
    defaultValue: '0',
  },
  hackable: {
    type: DataTypes.INTEGER(1),
    allowNull: false,
    defaultValue: '0',
  },
  ac_num: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0',
  },
  submit_num: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0',
  },
  statement: {
    type: DataTypes.TEXT,
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
  hint: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'problems',
});
