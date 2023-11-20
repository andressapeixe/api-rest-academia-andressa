module.exports = (sequelize, DataTypes) => {
  const Turma = sequelize.define('turma', {
    id_turma: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_instrutor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    horario: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    tempo_duracao: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    modalidade: {
      type: DataTypes.STRING(50),
      allowNull: false,
    }
  });

  // Relacionamento entre Turma e Instrutor
  Turma.belongsTo(sequelize.models.instrutor, {
    foreignKey: 'id_instrutor',
    as: 'instrutor',
  });

  return Turma;
};
