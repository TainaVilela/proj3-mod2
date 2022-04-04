const express = require("express");
const path = require("path");

require("dotenv").config();
const Filme = require("./model/filmes");
const db = require('./model/database');
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;


  const app = express();
  app.set("view engine", "ejs");

  app.use(express.json());

  app.use(express.static(path.join(__dirname)));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  

  app.get("/", async (req, res) => {
    //  const filmes = await Filme.findAll();
    //  console.log(filmes);
    //  console.log(typeof filmes);
    res.render("index", {
      //filmes,
    });
  });

  app.get("/lista", (req, res) => {
    res.render("lista");
  });

  app.get("/detalhes",(req, res)=>{
    res.render("detalhes");
  });

  app.get("/filmes/:id", async (req, res) => {
    const filme = await Filme.findByPk(req.params.id);

    res.render("detalhes", {
      filme,
    });
  });

  app.get("/cadastro", (req, res) => {
    res.render("cadastro", { mensagem: "" });
  });

  app.post("/cadastro", async (req, res) => {
    const { nome, descricao, imagem } = req.body;

    if (!nome) {
      res.render("cadatsro", {
        mensagem: "Nome é obrigatório",
      });
    }

    if (!imagem) {
      res.render("criar", {
        mensagem: "Imagem é obrigatório",
      });
    }

    try {
      const filme = await Filme.create({
        nome,
        descricao,
        imagem, 
      });

      res.render("criar", {
        filme,
        mensagem: "",
      });
    } catch (err) {
      console.log(err);

      res.render("criar", {
        mensagem: "Ocorreu um erro ao cadastrar o Filme!",
      });
    }
  });

  app.get("/editar/:id", async (req, res) => {
    const filme = await Filme.findByPk(req.params.id);

    if (!filme) {
      res.render("editar", {
        mensagem: "Filme não encontrado!",
      });
    }

    res.render("editar", {
      filme,
      mensagem: "",
    });
  });

  app.post("/editar/:id", async (req, res) => {
    const filme = await Filme.findByPk(req.params.id);

    const { nome, descricao, imagem } = req.body;

    filme.nome = nome;
    filme.descricao = descricao;
    filme.imagem = imagem;

    const filmeEditado = await filme.save();

    res.render("editar", {
      filme: filmeEditado,
      mensagem: "Filme editado com sucesso!",
    });
  });

  app.get("/deletar/:id", async (req, res) => {
    const filme = await Filme.findByPk(req.params.id);

    if (!filme) {
      res.render("deletar", {
        mensagem: "Filme não encontrado!",
      });
    }

    res.render("deletar", {
      filme,
      mensagem: "",
    });
  });

  app.post("/deletar/:id", async (req, res) => {
    const filme = await Filme.findByPk(req.params.id);

    if (!filme) {
      res.render("deletar", {
        mensagem: "Filme não encontrado!",
      });
    }

    await filme.destroy();
    res.redirect("/");
  });

db.conectado();

app.listen(port, () =>
    console.log(`Servidor rodando em http://localhost:${port}`))
