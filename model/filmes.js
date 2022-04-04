const { Sequelize } = require("sequelize");
const database = require("../model/database/index");

const Filme = database.sequelize.define(
  "filmes",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    descricao: Sequelize.STRING,
    imagem: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

const initTable = async() => {
  await Filme.sync();
}

initTable();

module.exports = Filme;
