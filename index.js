const express = require("express");
const path = require("path");
const app = express();
var cadastroCtrl = require("./routes/cadastroRoute");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/cadastro", cadastroCtrl);

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
