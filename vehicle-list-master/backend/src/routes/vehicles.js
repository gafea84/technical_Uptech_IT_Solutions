/**
 * Rutas de API para vehículos
 */

// Importaciones
const _ = require("lodash");
const config = require("../config");
const fs = require("fs");

// Declaraciones
let vehicles;
fs.readFile(`./src/models/${config.db_location}`, (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  vehicles = JSON.parse(data);
});

// Rutas

module.exports = server => {
  /**
   * Obtiene la lista de vehículos dependiendo de filtros específicos
   */
  server.get("/vehicles", (req, res, next) => {
    res.setHeader("Content-Type", "application/json");

    const filters = {
      size: req.query.size,
      color: req.query.color,
      brand: req.query.brand,
      model: req.query.model,
      type: req.query.type,
      limit: req.query.limit
    };

    const filteredVehicles = _.filter(vehicles, v => {
      return (
        (filters.type
          ? v.type === filters.type.split("_")[0] ||
            v.type === filters.type.split("_")[1] ||
            v.type === filters.type.split("_")[2]
          : true) &&
        (filters.brand ? v.brand === filters.brand : true) &&
        (filters.size ? v.size === filters.size : true) &&
        (filters.color ? v.color === filters.color : true) &&
        (filters.model ? v.model === filters.model : true)
      );
    });

    if (filteredVehicles.length) {
      filters.limit ? filteredVehicles.slice(1, filters.limit) : null;
      res.writeHead(200);
      res.end(JSON.stringify(filteredVehicles));
      return;
    }

    res.writeHead(404);
    res.end(JSON.stringify("No hay elementos"));
  });

  /**
   * Obtiene un vehículo a partir de su id
   */
  server.get("/vehicles/:id", (req, res, next) => {
    res.setHeader("Content-Type", "application/json");

    if (vehicles[parseInt(req.params.id)]) {
      res.writeHead(200);
      res.end(JSON.stringify(vehicles[parseInt(req.params.id)]));
      return;
    }

    res.writeHead(404);
    res.end(JSON.stringify("No existe este elemento"));
  });

  /**
   * Crea un objeto 'vehículo' nuevo
   */
  server.post("/vehicle", (req, res, next) => {
    res.setHeader("Content-type", "application/json");
    let vehicle = req.body;
    vehicle.id = Math.floor(Math.random() * 1000);
    vehicles[vehicle.id] = vehicle;

    fs.writeFile(
      `./src/models/${config.db_location}`,
      JSON.stringify(vehicles),
      "utf8",
      err => {
        if (err) {
          res.writeHead(500);
          res.end(
            JSON.stringify("Hemos tenido un problema creando el vehículo")
          );
          return console.log(err);
        }
        res.writeHead(200);
        res.end(JSON.stringify(vehicle));
      }
    );
  });

  /**
   * Actualiza un vehículo existente
   */
  server.patch("/vehicle/:id", (req, res, next) => {
    res.setHeader("Content-Type", "application/json");

    const vehicle = vehicles[parseInt(req.params.id)];
    const update = req.body;

    for (let field in update) {
      vehicle[field] = update[field];
    }

    res.writeHead(200);
    res.end(JSON.stringify(vehicle));
  });

  /**
   * Borrar un vehículo por su id
   */
  server.del("/vehicle/:id", (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    delete vehicles[parseInt(req.params.id)];

    fs.writeFile(
      `./src/models/${config.db_location}`,
      JSON.stringify(vehicles),
      "utf8",
      err => {
        if (err) {
          res.writeHead(500);
          res.end(
            JSON.stringify("Hemos tenido un problema creando el vehículo")
          );
          return console.log(err);
        }
        res.writeHead(200);
        res.end(JSON.stringify("Eliminado con éxito"));
      }
    );
  });
};
