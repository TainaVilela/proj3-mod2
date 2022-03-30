var express = require("express");
var router = express.Router();
const app = express();

const path = require("path");
app.use(express.static(path.join(__dirname)));

// lógica de validação
// router.use(function () {
//   console.log("Passar a lógica aqui");
// });

router.get("/", function (req, res) {
  res.render("cadastro");
});

module.exports = router;
