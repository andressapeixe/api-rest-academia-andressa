const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController.js');

router.post('/user', userController.create); //cadastrar usuario
router.post('/user/login', userController.login); //logar usuario

module.exports = router;
