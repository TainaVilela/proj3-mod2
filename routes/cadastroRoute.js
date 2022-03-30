const express = require('express');
const cadastroControler = require('../controllers/cadastro');

const router = express.Router();

router.post('/cadastro', cadastroControler.createCadastro)