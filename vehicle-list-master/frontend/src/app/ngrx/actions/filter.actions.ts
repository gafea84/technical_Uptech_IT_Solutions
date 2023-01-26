/**
 * filter.actions
 * Acciones de redux encargadas del estado global de los filtros
 */
import { Action } from "@ngrx/store";
import { Filter } from "src/classes/filter";

export const SAVE_FILTERS = "[FILTER] Save filter";

export class SaveFiltersAction implements Action {
  readonly type = SAVE_FILTERS;
  constructor(public filter: Filter) {}
}

export type Actions = SaveFiltersAction;
