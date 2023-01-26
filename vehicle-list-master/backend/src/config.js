/**
 * Configuración de variables de entorno
 */
require("./models/vehicles.dummy");
module.exports = {
  name: "CarListBackend",
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  db_location: process.env.DB_LOCATION || "vehicles.dummy.json",
  base_url:
    process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`
};
