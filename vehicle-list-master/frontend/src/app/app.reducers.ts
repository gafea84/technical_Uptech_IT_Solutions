/**
 * app.reducers
 * Contiene todos los reducers de la app centralizados para 'unirlos'
 */
import { ActionReducerMap } from "@ngrx/store";
import * as reducers from "./ngrx/reducers";

import { Filter } from "src/classes/filter";
import { Vehicle } from "src/classes/vehicle";

export interface AppState {
  filters: Filter;
  vehicles: { vehicles: Vehicle[]; errors: string };
}

export const appReducers: ActionReducerMap<AppState> = {
  filters: reducers.filterReducer,
  vehicles: reducers.vehicleReducer
};
