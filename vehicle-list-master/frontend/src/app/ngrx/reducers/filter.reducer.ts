/**
 * filter.reducer
 * Encargado de actualizar el estado de los filtros para que estén disponibles en toda la app
 */
import * as fromFilter from "../actions/filter.actions";
import { Filter } from "src/classes/filter";

/**
 * initalState
 * Estado inicial de los filtros
 */
const initialState = new Filter(
  [
    { type: "car", isSelected: false },
    { type: "moto", isSelected: false },
    { type: "truck", isSelected: false }
  ],
  "",
  "",
  "",
  ""
);

export function filterReducer(
  state = initialState,
  action: fromFilter.Actions
): Filter {
  switch (action.type) {
    case fromFilter.SAVE_FILTERS:
      return {
        ...state,
        ...action.filter
      };

    default:
      return state;
  }
}
