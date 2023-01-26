/**
 * server.js - fichero principal para la ejecución del servidor rest
 */

// Importaciones

if (process.env.NODE_ENV === "development") {
  // Lee estas variables solo si está en development
  require("dotenv").config();
}

const restify = require("restify");
const routes = require("./src/routes/routes");
const config = require("./src/config");
const corsMiddelware = require("restify-cors-middleware");

// Declaraciones
const server = restify.createServer({ name: config.name });
const cors = corsMiddelware({
  origins: ["*"],
  allowHeaders: ["Authorization"],
  exposeHeaders: ["Authorization"]
});

// Instanciamiento del servidor
server.pre(cors.preflight);
server.use(cors.actual);

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

routes(server);

// Rutas indefinidas
server.get("*", (req, res) => {
  res.end("Aplicación ON!");
});

// Inicialización del servidor
server.listen(config.port, () => {
  console.log(
    "%s listening at %s, in %s enviroment",
    server.name,
    config.base_url,
    config.env
  );
});

module.exports = server;
