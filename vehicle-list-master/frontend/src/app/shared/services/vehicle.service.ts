/**
 * ### vehicle.service
 * Servicion encargado de hacer llamadas al API rest del backend
 */
import { Injectable } from "@angular/core";
import { Vehicle } from "src/classes/vehicle";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class VehicleService {
  private apiURL = environment.apiURL;

  constructor(private httpClient: HttpClient) {}

  /**
   *  Método encargado de obtener un observable de vehículos dependiendo de los filtros
   * * types: array - tipos de vehiculos (car || moto || truck)
   * * color: string - color del vehículo a buscar
   * * size: string - tamaño del vehículo a buscar
   * * brand: string - marca del vehículo a buscar
   * * model: string - modelo del vehículo a buscar
   * * limit: number - limite de elementos a retornar
   */
  public getVehicles(
    types: Array<{ type: string; isSelected: boolean }>,
    color: string,
    size: string,
    brand: string,
    model: string,
    limit?: number
  ): Observable<Vehicle[]> {
    const strTypes = types
      ? types
          .filter(o => o.isSelected)
          .map(o => o.type)
          .join("_")
      : "";

    return this.httpClient
      .get<any>(
        `${this.apiURL}/vehicles?type=${strTypes}&color=${
          color != "Color" && color ? color : ""
        }&size=${size != "Tamaño" && size ? size : ""}&brand=${
          brand != "Marca" && brand ? brand : ""
        }&model=${model != "Modelo" && model ? model : ""}&limit=${limit}`
      )
      .pipe(
        map(a => {
          return Object.values(a);
        })
      );
  }

  /**
   * Método que obtiene un vehículo en específico dependiendo de su Id
   * * id - string : identificador random del vehículo
   */
  public getVehicle(id: string): Observable<Vehicle> {
    return this.httpClient.get<any>(`${this.apiURL}/vehicles/${id}`);
  }
}
