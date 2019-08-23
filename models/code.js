/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('code', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    exp: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    phonenumber: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'code'
  });
};
