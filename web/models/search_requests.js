module.exports = (sequelize, DataTypes) => sequelize.define('search_requests', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  remote_addr: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('search', 'autocomplete'),
    allowNull: false,
  },
  cache_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  q: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  result: {
    type: 'MEDIUMTEXT',
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'search_requests',
});
