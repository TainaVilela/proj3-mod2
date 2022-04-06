const express = require("express");
const path = require("path");

require("dotenv").config();

const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const routes = require("./routes/router.js");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());

app.use(express.static(path.join(__dirname)));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
