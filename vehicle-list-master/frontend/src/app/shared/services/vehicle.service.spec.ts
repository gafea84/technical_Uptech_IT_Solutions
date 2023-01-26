/**
 * vehicle.service.spec
 * Pruebas unitarias para el servicio de vehículos
 */

// *Importación de los módulos y componentes necesarios para realizar las pruebas
import { TestBed } from "@angular/core/testing";

// servicio
import { VehicleService } from "./vehicle.service";

// módulos
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { environment } from "../../../environments/environment";

// *Pruebas
describe("VehicleService", () => {
  let httpTestingController: HttpTestingController;
  let service: VehicleService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(VehicleService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return a vehicle and call the right endpoint", () => {
    const mockVehicle = {
      id: "1",
      size: "big",
      model: "2019",
      brand: "Mazda",
      color: "red",
      photo:
        "https://auteco.vteximg.com.br/arquivos/ids/160052-1000-1000/moto_advance_110_negro_azul_azul_2019_2.jpg?v=636747373594330000",
      type: "car"
    };

    service.getVehicle("2").subscribe(vehicle => {
      expect(vehicle.size).toEqual("big");
    });

    const req = httpTestingController.expectOne(
      `${environment.apiURL}/vehicles/2`
    );
    expect(req.request.method).toEqual("GET");
    req.flush(mockVehicle); // supone que se retorna asincrónicamente el modelo definido
  });

  it("should return an array of vehicles and call the right endpoint", () => {
    const mockVehicles = {
      "1": {
        id: "1",
        size: "big",
        model: "2018",
        brand: "Mazda",
        color: "red",
        photo: "",
        type: "car"
      },
      "2": {
        id: "2",
        size: "big",
        model: "2019",
        brand: "Mazda",
        color: "white",
        photo: "",
        type: "car"
      }
    };

    service
      .getVehicles([{ type: "", isSelected: false }], "", "", "", "", 10)
      .subscribe(vehicles => {
        expect(vehicles[0].model).toEqual("2018");
        expect(vehicles[1].color).toEqual("white");
      });

    const strTypes = [{ type: "", isSelected: false }]
      .filter(o => o.isSelected)
      .map(o => o.type)
      .join("_");

    const req = httpTestingController.expectOne(
      `${
        environment.apiURL
      }/vehicles?type=${strTypes}&color=&size=&brand=&model=&limit=${10}`
    );

    expect(req.request.method).toEqual("GET");
    req.flush(mockVehicles); // supone que se retorna asincrónicamente el modelo definido
  });
});
