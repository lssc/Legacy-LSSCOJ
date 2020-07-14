/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user_info', {
    usergroup: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'U',
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.CHAR(32),
      allowNull: false,
    },
    svn_password: {
      type: DataTypes.CHAR(10),
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1500',
    },
    facebook: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    sex: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'U',
    },
    ac_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    register_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: 'CURRENT_TIMESTAMP',
    },
    remote_addr: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    http_x_forwarded_for: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    remember_token: {
      type: DataTypes.CHAR(60),
      allowNull: false,
    },
    quote: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'user_info',
  });
};
