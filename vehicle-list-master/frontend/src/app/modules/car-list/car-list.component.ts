import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducers";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Vehicle } from "src/classes/vehicle";

@Component({
  selector: "app-car-list",
  templateUrl: "./car-list.component.html",
  styleUrls: ["./car-list.component.scss"]
})
export class CarListComponent implements OnInit, OnDestroy {
  public vehicles: Vehicle[];
  public errors: any;

  /**
   * unsubscribe$
   * variable para manejar la des subscripción a los observalbles
   */
  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.pipe(takeUntil(this.unsubscribe$)).subscribe(state => {
      if (state.vehicles) {
        this.vehicles = state.vehicles.vehicles;
        this.errors = state.vehicles.errors;
      }
    });
  }

  // Si se desruye el componente elimina la subscripción al store
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
