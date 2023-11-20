module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    nome: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
  });
  return User;
};
