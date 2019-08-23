/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    userid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    nick_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    avatar_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    gender: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    openid: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phonenumber: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    session_key: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    updated_at: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: 'users'
  });
};
