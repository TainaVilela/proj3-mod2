const Cadastro = require('../models')

module.exports = app =>{

    app.get('/cadastros', (req, res) => res.send('rota cadastro fazendo get'))

    app.post('/cadastros', (req, res) => {
        const cadastros = req.body

        Cadastro.create(cadastros, res)

    })
}