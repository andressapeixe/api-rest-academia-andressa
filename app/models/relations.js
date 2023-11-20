module.exports = function (models) {
  models.instrutor.hasMany(models.turma, {
    foreignKey: 'id_instrutor',
    onDelete: 'CASCADE',
  });
  models.turma.belongsTo(models.instrutor, {
    foreignKey: 'id_instrutor',
    onDelete: 'CASCADE',
  });
};
