/**
 * vehicle.test - archivo de pruebas del api para las rutas del crud de 'vehicles'
 */

// Importaciones
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const assertArrays = require("chai-arrays");
const fs = require("fs");
const config = require("../src/config");

// Instanciamiento de chai
const expect = chai.expect;
chai.use(chaiHttp);
chai.use(assertArrays);

//Testing para API de vehículos
describe("Vehículos", () => {
  let vehicle;

  // Limpia la db de testing
  fs.writeFileSync(
    `./src/models/${config.db_location}`,
    JSON.stringify({ "": "" }),
    err => {
      if (err) {
        return console.log(err);
      }
    }
  );

  describe("Para vehículos (individualmente)", () => {
    it("Debería crear un vehículo", done => {
      chai
        .request(server)
        .post("/vehicle")
        .send({
          size: "big",
          model: "1999",
          brand: "BMW",
          color: "red",
          photo:
            "https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi4-MTC9IrlAhUNvVkKHYCDCqsQjRx6BAgBEAQ&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D%26url%3Dhttps%253A%252F%252Fwww.dercocenter.cl%252Fnoticias%252F6-caracteristicas-de-un-suv-ideal-para-tu-familia%252F%26psig%3DAOvVaw09dQ2__W8kR6bUiVIf_yWs%26ust%3D1570563875895582&psig=AOvVaw09dQ2__W8kR6bUiVIf_yWs&ust=1570563875895582",
          type: "moto"
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          vehicle = res.body;
          done();
        });
    });

    it("Debería retornar un vehículo con id existente", done => {
      chai
        .request(server)
        .get(`/vehicles/${vehicle.id}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          done();
        });
    });

    it(`Debería actualizar el vehículo con un id específico`, done => {
      chai
        .request(server)
        .patch(`/vehicle/${vehicle.id}`)
        .send({
          size: "small",
          model: "2000"
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body.size).to.be.equal("small");
          expect(res.body.model).to.be.equal("2000");
          done();
        });
    });

    it("Debería crear un vehículo", done => {
      chai
        .request(server)
        .post("/vehicle")
        .send({
          size: "small",
          model: "1999",
          brand: "Chevrolet",
          color: "yellow",
          photo:
            "https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi4-MTC9IrlAhUNvVkKHYCDCqsQjRx6BAgBEAQ&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D%26url%3Dhttps%253A%252F%252Fwww.dercocenter.cl%252Fnoticias%252F6-caracteristicas-de-un-suv-ideal-para-tu-familia%252F%26psig%3DAOvVaw09dQ2__W8kR6bUiVIf_yWs%26ust%3D1570563875895582&psig=AOvVaw09dQ2__W8kR6bUiVIf_yWs&ust=1570563875895582",
          type: "truck"
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          vehicle = res.body;
          done();
        });
    });

    it("Debería borrar un vehículo específico", done => {
      chai
        .request(server)
        .del(`/vehicle/${vehicle.id}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });

    it("Debería crear un vehículo", done => {
      chai
        .request(server)
        .post("/vehicle")
        .send({
          size: "medium",
          model: "1999",
          brand: "Chevrolet",
          color: "blue",
          photo:
            "https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi4-MTC9IrlAhUNvVkKHYCDCqsQjRx6BAgBEAQ&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D%26url%3Dhttps%253A%252F%252Fwww.dercocenter.cl%252Fnoticias%252F6-caracteristicas-de-un-suv-ideal-para-tu-familia%252F%26psig%3DAOvVaw09dQ2__W8kR6bUiVIf_yWs%26ust%3D1570563875895582&psig=AOvVaw09dQ2__W8kR6bUiVIf_yWs&ust=1570563875895582",
          type: "moto"
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          vehicle = res.body;
          done();
        });
    });
  });

  describe("Para obtener y filtrar vehículos", () => {
    it("Debería retornar todos los vehículos en formato de arreglo", done => {
      chai
        .request(server)
        .get("/vehicles")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.array();

          done();
        });
    });

    it("Debería retornar todos los vehículos rojos (1) en formato de arreglo", done => {
      chai
        .request(server)
        .get("/vehicles?color=red")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.array();
          expect(res.body.length).to.be.equal(1);
          done();
        });
    });

    it("Debería retornar todos los vehículos tamaño 'small' y tipo 'moto' (1) en formato de arreglo", done => {
      chai
        .request(server)
        .get("/vehicles?size=small&type=moto")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.array();
          expect(res.body.length).to.be.equal(1);
          done();
        });
    });

    it("Debería retornar todos los vehículos marca 'chevrolet' y color 'rojo' (0) en formato de arreglo", done => {
      chai
        .request(server)
        .get("/vehicles?brand=Chevrolet&color=red")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});
