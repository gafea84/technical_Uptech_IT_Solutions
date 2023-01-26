/**
 * routes.js - Conjunto de rutas aisladas para el servicio
 */

const vehicles = require("./vehicles");

module.exports = server => {
  vehicles(server);
};
