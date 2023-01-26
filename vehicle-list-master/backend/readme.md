# Backend

Este backend utiliza restify y nodejs para implementar un API REST

## Para probar

Correr `npm run dev` para arrancar servidor de desarrollo en `http://localhost:3030/`
Correr `npm run test` para ejecutar pruebas unitarias
Correr `npm start` para ejecutar servidor de producción en `http://localhost:3000/`

## Pruebas unitarias

Correr `npm run test` para ejecutar los test de mocha y chai

## API

Se creó un API rest implementando un CRUD para los vehículos

| url           | método | params | query                                  | body                  | descripción                                                      |
| ------------- | ------ | ------ | -------------------------------------- | --------------------- | ---------------------------------------------------------------- |
| /vehicles     | GET    |        | size, color, brand, model, type, limit |                       | Obtiene la lista de vehículos dependiendo de filtros específicos |
| /vehicles/:id | GET    | id     |                                        |                       | Obtiene un vehículo a partir de su id                            |
| /vehicle      | POST   |        |                                        | Vehicle               | Crea un objeto 'vehicle'                                         |
| /vehicle/:id  | PATCH  | id     |                                        | {"type": "moto", ...} | Actualiza campos específicos de un vehículo específico           |
| /vehicle/:id  | DEL    | id     |                                        |                       | Borra un vehículo con un id específico                           |

#### Vehicle

El objeto vehicle es un json compuesto de los siguientes atributos

- id: String
- type: String // conjunto de filtros ej: car_moto_trucl
- size: String
- model: String
- brand: String
- color: String
- photo: String // url de la imagen del vehículo

EJ: `{"id": "1","type": "car_moto", "size": "Grande","model":"2019","brand": "Mazda", "color": "Rojo", "photo": "http:img.com",}`
