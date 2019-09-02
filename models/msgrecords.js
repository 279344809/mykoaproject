/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('msgrecords', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    msg: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    nick_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(11),
      allowNull: false
    }
  }, {
    tableName: 'msgrecords'
  });
};
