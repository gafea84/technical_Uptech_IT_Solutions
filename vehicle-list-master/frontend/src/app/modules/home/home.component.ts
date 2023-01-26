/**
 * home.component
 * Componente encargado de mostrar la pantalla principal
 */

import { Component, OnInit } from "@angular/core";
import { VehicleService } from "src/app/shared/services/vehicle.service";
import { Observable } from "rxjs";
import { Vehicle } from "src/classes/vehicle";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  /**
   * Variable que almacena un observable de las recomendaciones de vehiculos
   */
  public recommendations$: Observable<Vehicle[]>;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {
    this.fetchRecommendations();
  }

  fetchRecommendations() {
    this.recommendations$ = this.vehicleService.getVehicles(
      null,
      "",
      "",
      "",
      "",
      4
    );
  }
}
