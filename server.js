const index = require('./index');

const port = process.env.PORT || 3000;

const app = index();

app.listen(port, () =>
    console.log(`Servidor rodando em http://localhost:${port}`))