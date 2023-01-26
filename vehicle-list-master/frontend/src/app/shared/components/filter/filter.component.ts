/**
 * filter.component
 * Componente encargado renderizar los filtros en distintas pantallas
 */
import { Component, OnInit, Input, OnDestroy } from "@angular/core";

import { actions } from "../../../ngrx/actions";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app.reducers";
import { Filter } from "src/classes/filter";
import { VehicleService } from "../../services/vehicle.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"]
})
export class FilterComponent implements OnInit, OnDestroy {
  /**
   * Variable que se encarga de renderizar dos tipos de filtro (en home y en listado de vehículos)
   */
  @Input("isFirstQuery") public isFirstQuery = true;

  /**
   * Variable que contiene las marcas de la db
   */
  public brands: string[];

  /**
   * Variable que contiene los modelos de la db
   */
  public models: string[];

  /**
   *  Variable que contiene los colores de la db
   */
  public colors: string[];

  /**
   *  Variable que contiene los tamaños de la db
   */
  public sizes: string[];

  /**
   * Variable para mostrar más o menos filtros en mobile
   */
  public showMoreFilters = true;

  /**
   * Variables que maneja los filtros seleccionados
   */
  public selectedTypes = [
    { type: "car", isSelected: false },
    { type: "moto", isSelected: false },
    { type: "truck", isSelected: false }
  ];
  public selectedBrand = "";
  public selectedModel = "";
  public selectedColor = "";
  public selectedSize = "";

  /**
   * Variable para manejar la desubscripción de observables
   */
  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private vehicleService: VehicleService
  ) {}

  ngOnInit() {
    // Carga los posibles valores de los filtros a partir de la db
    this.vehicleService
      .getVehicles(null, "", "", "", "")
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(vehicles => {
        this.models = [...new Set(vehicles.map(i => i.model))];
        this.brands = [...new Set(vehicles.map(i => i.brand))];
        this.colors = [...new Set(vehicles.map(i => i.color))];
        this.sizes = Array.from(new Set(vehicles.map(i => i.size)));
      });
    // Carga los filtros del store
    this.store.subscribe(state => {
      if (state.filters) {
        this.selectedTypes = state.filters.ftype;
        this.selectedBrand = state.filters.brand;
        this.selectedModel = state.filters.model;
        this.selectedColor = state.filters.color;
        this.selectedSize = state.filters.size;
      }
    });
  }

  /**
   * Método encargado de mostrar más o menos filtros en la versión mobile
   */
  toggleShowMoreFilters() {
    this.showMoreFilters = !this.showMoreFilters;
  }

  /**
   * Método encargado de filtrar guardando los filtros en el store
   */
  search() {
    const action = new actions.SaveFiltersAction(
      new Filter(
        this.selectedTypes,
        this.selectedModel,
        this.selectedBrand,
        this.selectedColor,
        this.selectedSize
      )
    );
    this.store.dispatch(action);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
