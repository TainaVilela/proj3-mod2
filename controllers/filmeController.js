const res = require("express/lib/response");
const Filme = require("../model/filmes");
const Op = require("sequelize").Op;

const orderById =  {order: [["id", "ASC"]] };
let message = "";
let type = "";

const getAll = async (req, res) => {
    try {
      setTimeout(() => {
        message = "";
        type = "";
      }, 1000);
  
      const filmes = await Filme.findAll(orderById);
      res.render("index", {
        filmes,
        filmePut: null,
        filmeDel: null,
        message,
        type,
        filmeSearch: []
      });
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  };

  const signup = (req, res) => {
    try {
      res.render("signup", { message, type });
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  };
  
  const create = async (req, res) => {
    try {
      const filme = req.body;
      console.log(filme);
      if (
        !filme.nome ||
        !filme.descricao ||
        !filme.imagem
      ) {
        message = "Preencha todos os campos para cadastrar!";
        return res.redirect("/create");
      }
  
      await filme.create(filme);
      message = "Filme criado com sucesso!";
      type = "success";
      res.redirect("/");
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  };
  
  const getById = async (req, res) => {
    try {
      const method = req.params.method;
      const filmes = await Filme.findAll(orderById);
      const filme = await Filme.findByPk(req.params.id);
  
      if (method == "put") {
        res.render("index", {
          filmes,
          filmePut: filme,
          filmeDel: null,
          message,
          type,
          filmeSearch: []
        });
      } else {
        res.render("index", {
            filmes,
            filmePut: filme,
            filmeDel: null,
            message,
            type,
            filmeSearch: []
        });
      }
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  };
  
  const update = async (req, res) => {
    try {
      const filme = req.body;
      await filme.update(filme, { where: { id: req.params.id } });
      message = "Filme atualizado com sucesso!";
      type = "success";
      res.redirect("/");
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  };
  
  const remove = async (req, res) => {
    try {
      await Filme.destroy({ where: { id: req.params.id } });
      message = "Filme removido com sucesso!";
      type = "success";
      res.redirect("/");
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  };
  
  const searchByName = async (req, res) => {
    try {
      const Filme = await Filme.findAll({
        where: {
          nome: {
            [Op.like]: `%${req.body.filme}%`,
          },
        },
        order: [["id", "ASC"]]
      });
  
      if(filme.length == 0 ){
        message = "Não encontramos esse filme"
        type = "warning"
        return res.redirect("/");
      }
  
      res.render("index", {
        filmes: [],
        filmePut: null,
        filmeDel: null,
        message,
        type,
        filmeSearch: filme
      });
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  };
  
  module.exports = {
    getAll,
    create,
    getById,
    update,
    remove,
    searchByName,
    signup
  };
