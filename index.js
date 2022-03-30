const express = require("express");
const consign = require('consign');
const path = require("path");

const cadastroRoute = require("./routes/cadastroRoute");

module.exports = () => {

  const app = express();

  app.use(express.json());

  app.set("view engine", "ejs");

  app.use('/cadastro', cadastroRoute)

  consign()
      .include('controllers')
      .into(app)

  return app;
};