/**
 * car-detail.component
 * Componente encargado de renderizar la información de cada vehículo en específico
 * y mostrar 'recomendaciones'
 */
import { Component, OnInit, OnDestroy } from "@angular/core";
import { VehicleService } from "src/app/shared/services/vehicle.service";
import { Vehicle } from "src/classes/vehicle";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-car-detail",
  templateUrl: "./car-detail.component.html",
  styleUrls: ["./car-detail.component.scss"]
})
export class CarDetailComponent implements OnInit, OnDestroy {
  /**
   * Varibale que tene la información del detalle de un vehículo
   */
  public vehicle$: Observable<Vehicle>;

  /**
   * Variable que almacena un observable de las 'recomendaciones' de vehículos
   */
  public recommendations$: Observable<Vehicle[]>;

  /**
   * Variable que tiene el id obtenido de la ruta
   */
  public id: string;

  /**
   * unsubscribe$
   * variable para manejar la des subscripción a los observalbles
   */
  private unsubscribe$ = new Subject<void>();

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.fetchRecommendations();
    this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
      this.id = params["id"];
      this.fetchVehicle();
    });
  }

  fetchVehicle() {
    this.vehicle$ = this.vehicleService.getVehicle(this.id);
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

  // Si se desruye el componente elimina la subscripción al store
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
