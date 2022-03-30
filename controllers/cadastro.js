module.exports = app =>{

    app.get('/cadastros', (req, res) => res.send('rota cadastro fazendo get'))

    app.post('/cadastros', (req, res) => {

        res.send('rota cadastro realizando post')})
}