/**
 * car-list.component.spec
 * Pruebas unitarias para el car-list component
 */

// *Importación de los módulos y componentes necesarios para realizar las pruebas
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

// componentes
import { CarListComponent } from "./car-list.component";
import { FilterComponent } from "src/app/shared/components/filter/filter.component";
import { VehicleItemComponent } from "src/app/shared/components/vehicle-item/vehicle-item.component";

// módulos
import { FormsModule } from "@angular/forms";
import {
  intersectionObserverPreset,
  LazyLoadImageModule
} from "ng-lazyload-image";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";

// ngrx
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { filterEffects } from "src/app/ngrx/effects/filter.effects";
import { appReducers } from "src/app/app.reducers";
import { APP_BASE_HREF } from "@angular/common";

// *Pruebas
describe("CarListComponent", () => {
  let component: CarListComponent;
  let fixture: ComponentFixture<CarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CarListComponent, FilterComponent, VehicleItemComponent],
      imports: [
        HttpClientModule,
        FormsModule,
        RouterTestingModule,
        LazyLoadImageModule.forRoot({
          preset: intersectionObserverPreset // <-- tell LazyLoadImage that you want to use IntersectionObserver
        }),
        StoreModule.forRoot(appReducers),
        EffectsModule.forRoot([filterEffects])
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: "/" }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
