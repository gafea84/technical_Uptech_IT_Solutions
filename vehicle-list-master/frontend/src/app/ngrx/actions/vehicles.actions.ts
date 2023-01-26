/**
 * filter.actions
 * Acciones de redux encargadas del estado global de los filtros
 */
import { Action } from "@ngrx/store";
import { Filter } from "src/classes/filter";
import { Vehicle } from "src/classes/vehicle";

export const LOAD_VEICHLE_SUCCESS = "[VEHICLE] Vehicles loaded Succes";
export const LOAD_VEICHLE_ERROR = "[VEHICLE] Vehicles loaded error";

export class loadVehiclesSuccessAction implements Action {
  readonly type = LOAD_VEICHLE_SUCCESS;
  constructor(public vehicles: Vehicle[]) {}
}

export class loadVehiclesErrorAction implements Action {
  readonly type = LOAD_VEICHLE_ERROR;
  constructor(public error: string) {}
}

export type Actions = loadVehiclesSuccessAction | loadVehiclesErrorAction;
