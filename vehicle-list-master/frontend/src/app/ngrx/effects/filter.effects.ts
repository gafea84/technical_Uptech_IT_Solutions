/**
 * filter.effects
 * Encargado de manejar los efectos de correspondientes a las acciones de los filtros
 */

import { Injectable } from "@angular/core";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { map, catchError, tap, switchMap } from "rxjs/operators";
import { VehicleService } from "../../shared/services/vehicle.service";
import * as fromFilter from "../actions/filter.actions";
import * as fromVehicles from "../actions/vehicles.actions";

import { Router } from "@angular/router";
import { Vehicle } from "src/classes/vehicle";
import { Filter } from "src/classes/filter";
import { Observable, of } from "rxjs";

@Injectable()
export class filterEffects {
  /**
   * filter$ - effect : Efecto encargado de filtrar los vehículos y redireccionar a la lista
   */
  @Effect()
  filter$ = this.actions$.pipe(
    ofType(fromFilter.SAVE_FILTERS),
    map((action: Filter) => action),
    switchMap((payload: any) => {
      // dependiendo de los filtros con los que se llamó la acción, se hace el llamado al backend
      return this.vehicleService
        .getVehicles(
          payload.filter.ftype,
          payload.filter.color,
          payload.filter.size,
          payload.filter.brand,
          payload.filter.model
        )
        .pipe(
          map(vehicles => {
            this.router.navigate(["/list"]);
            return new fromVehicles.loadVehiclesSuccessAction(vehicles);
          }),
          catchError(error => {
            this.router.navigate(["/list"]);
            return of(new fromVehicles.loadVehiclesErrorAction(error));
          })
        );
    })
  );

  constructor(
    private actions$: Actions,
    private vehicleService: VehicleService,
    private router: Router
  ) {}
}
