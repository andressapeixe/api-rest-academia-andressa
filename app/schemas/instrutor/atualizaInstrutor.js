module.exports = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    nome: { type: 'string', minLength: 3 },
    dataNascimento: { type: 'string' },
    email: { type: 'string' }
  },

  additionalProperties: false,
};
