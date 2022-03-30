const express = require('express');
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, )));
app.use(express.urlencoded({extended: true}));

const port = process.env.PORT || 3000;

app.get('/', (req,res)=>{
    res.render('',)
})
app.listen(port, () =>
    console.log(`Servidor rodando em http://localhost:${port}`)
);