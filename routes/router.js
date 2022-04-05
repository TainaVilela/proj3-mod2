const routes = require("express").Router();
const filmeController = require("../controllers/filmeController");

routes.get('/', filmeController.getAll);
routes.post('/create', filmeController.create);
routes.get('/getById/:id/:method', filmeController.getById);
routes.post('/update/:id', filmeController.update);
routes.get('/remove/:id', filmeController.remove);
routes.get('/detalhes/:id', filmeController.detalhes);

routes.get("/signup", filmeController.signup);

module.exports = routes;