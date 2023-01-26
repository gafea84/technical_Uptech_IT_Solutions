/**
 * vehicle-item.component
 * Componente que maneja la información y eventos de cada vehículo
 */
import { Component, OnInit, Input } from "@angular/core";
import { Vehicle } from "src/classes/vehicle";
import { Router } from "@angular/router";

@Component({
  selector: "app-vehicle-item",
  templateUrl: "./vehicle-item.component.html",
  styleUrls: ["./vehicle-item.component.scss"]
})
export class VehicleItemComponent implements OnInit {
  /**

   * Variable que maneja la información de cada vehículo
   */
  @Input("vehicle") public vehicle: Vehicle;

  /**
   * Variable que maneja el id del vehículo (creada solo para testing)
   */
  public id: string;
  constructor(private router: Router) {}

  ngOnInit() {
    this.id = this.vehicle ? this.vehicle.id : "1"; // para realizar testing
  }

  onClick() {
    this.router.navigateByUrl(`/detail/${this.id}`);
  }
}
