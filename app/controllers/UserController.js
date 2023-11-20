const models = require('../models/index.js');
const User = models.user;
const Ajv = require('ajv');
const ajv = new Ajv();
const schema = require('../schemas/user/novoUser.js');
const validacao = ajv.compile(schema);
const helper = require('../commons/helper.js');
const schemaLogin = require('../schemas/user/login.js');
const validacaoLogin = ajv.compile(schemaLogin);

exports.create = (request, response) => {
  let validacoes = validacao(request.body);
  if (validacoes == false) {
    return response.status(400).json({
      message: validacao.errors[0].message,
    });
  }
  const dadosUser = {
    nome: request.body.nome ? request.body.nome : null,
    email: request.body.email,
    senha: helper.hashSenha(request.body.senha),
  };

  User.create(dadosUser)
    .then((data) => {
      data.setDataValue('senha', '');
      return response.status(201).json(data);
    })
    .catch((error) => {
      return response.status(500).json({
        message: 'erro ao cadastrar usuario ' + error.message,
      });
    });
};

exports.login = (request, response) => {
  let validacoes = validacaoLogin(request.body);
  if (validacoes == false) {
    return response
      .status(400)
      .json({ message: validacaoLogin.errors[0].message });
  }

  let user = request.body;
  user.senha = helper.hashSenha(user.senha);

  User.findOne({ where: user }).then((data) => {
    if (!data) {
      return response
        .status(404)
        .json({ message: 'Credenciais não encontradas no sistema' });
    }
    return response
      .status(200)
      .json({ token: helper.gerarToken(data.nome, data.id) });
  });
};
