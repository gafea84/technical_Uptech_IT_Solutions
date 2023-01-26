/**
 * filter.reducer
 * Encargado de actualizar el estado de los vehículos
 * (Solo a manera de demostración para futuro escalamiento)
 */
import * as fromVehicles from "../actions/vehicles.actions";
import { Vehicle } from "src/classes/vehicle";

/**
 * initalState
 * Estado inicial de los vehículos
 */
const initialState = { vehicles: [], errors: null };

export function vehicleReducer(
  state = initialState,
  action: fromVehicles.Actions
): { vehicles: Vehicle[]; errors: string } {
  switch (action.type) {
    case fromVehicles.LOAD_VEICHLE_SUCCESS:
      return { vehicles: action.vehicles, errors: "" };

    case fromVehicles.LOAD_VEICHLE_ERROR:
      return { vehicles: [], errors: action.error };

    default:
      return state;
  }
}
