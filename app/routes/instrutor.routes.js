const express = require('express');
const router = express.Router();
const instrutorController = require('../controllers/InstrutorController.js');
const authMiddleware = require('../middlewares/isAutenticado.js');

router.get('/instrutor', [authMiddleware.check], instrutorController.findAll);

router.post('/instrutor', [authMiddleware.check], instrutorController.store);

router.get('/instrutor/:id', [authMiddleware.check], instrutorController.findOne);

router.put('/instrutor/:id', [authMiddleware.check], instrutorController.update);

router.delete('/instrutor/:id', [authMiddleware.check], instrutorController.delete);

module.exports = router;
