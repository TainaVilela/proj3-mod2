const express = require("express");
const consign = require('consign');

const bodyParser = require('body-parser');

const cadastroRoute = require("./routes/cadastroRoute");

module.exports = () => {

  const app = express();

  app.use(express.json());

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.set("view engine", "ejs");

  app.use('/cadastro', cadastroRoute)

  consign()
      .include('controllers')
      .into(app)

  return app;
};