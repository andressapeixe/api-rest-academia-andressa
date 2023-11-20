const Ajv = require('ajv');
const ajv = new Ajv();
const schema = require('../schemas/instrutor/novoInstrutor.js');
const validacao = ajv.compile(schema);
const schemaUpdate = require('../schemas/instrutor/atualizaInstrutor.js');
const validacaoUpdate = ajv.compile(schemaUpdate);
const models = require('../models/index.js');
const Instrutor = models.instrutor;
const Turma = models.turma;

exports.findAll = (request, response) => {
  Instrutor.findAll({ include: Turma })
    .then((data) => {
      return response.status(200).json(data);
    })
    .catch((erro) => {
      return response.status(500).json({
        message: 'erro no server' + erro.message,
      });
    });
};

exports.findOne = (request, response) => {
  let id = request.params.id;
  Instrutor.findByPk(id)
    .then((data) => {
      if (data) {
        return response.status(200).json(data);
      } else {
        return response.status(404).json({
          message: 'Instrutor nao encontrado',
        });
      }
    })
    .catch((erro) => {
      return response.status(500).json({
        message: 'erro no server ' + erro.message,
      });
    });
};

exports.store = (request, response) => {
  let validacoes = validacao(request.body);
  if (!validacoes) {
    return response.status(400).json({
      message: validacao.errors[0].message,
    });
  }
  Instrutor.create(request.body)
    .then((data) => {
      return response.status(201).json(data);
    })
    .catch((erro) => {
      return response.status(500).json({
        message: 'erro no server' + erro.message,
      });
    });
};

exports.update = (request, response) => {
  let id = request.params.id;
  let validacoes = validacaoUpdate(request.body);
  if (!validacoes) {
    return response.status(400).json({
      message: validacaoUpdate.errors[0].message,
    });
  }
  Instrutor.findByPk(id)
    .then((data) => {
      if (data) {
        Instrutor.update(request.body, { where: { id: id } }).then((result) => {
          if (result) {
            Instrutor.findByPk(id).then((resultSearch) => {
              return response.status(200).json(resultSearch);
            });
          }
        });
      } else {
        return response.status(404).json({
          message: 'Instrutor nao encontrado',
        });
      }
    })
    .catch((erro) => {
      return response.status(500).json({
        message: 'erro no server ' + erro.message,
      });
    });
};

exports.delete = (request, response) => {
  let id = request.params.id;
  Instrutor.findByPk(id)
    .then((data) => {
      if (data) {
        data.destroy();
        return response.status(200).json({
          message: 'Instrutor excluido com sucesso',
        });
      } else {
        return response.status(404).json({
          message: 'Instrutor nao encontrado',
        });
      }
    })
    .catch((erro) => {
      return response.status(500).json({
        message: 'erro no server ' + erro.message,
      });
    });
};
