/**
 * home.component.spec
 * Pruebas unitarias para el home component
 */

// *Importación de los módulos y componentes necesarios para realizar las pruebas
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

//componentes
import { HomeComponent } from "./home.component";
import { VehicleItemComponent } from "src/app/shared/components/vehicle-item/vehicle-item.component";
import { FilterComponent } from "src/app/shared/components/filter/filter.component";

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
import { appReducers } from "src/app/app.reducers";
import { filterEffects } from "src/app/ngrx/effects/filter.effects";
import { EffectsModule } from "@ngrx/effects";
import { Router } from "@angular/router";
import { VehicleService } from "src/app/shared/services/vehicle.service";

// *Pruebas
describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, FilterComponent, VehicleItemComponent],
      imports: [
        FormsModule,
        HttpClientModule,
        RouterTestingModule,
        LazyLoadImageModule.forRoot({
          preset: intersectionObserverPreset // <-- tell LazyLoadImage that you want to use IntersectionObserver
        }),
        StoreModule.forRoot(appReducers),
        EffectsModule.forRoot([filterEffects])
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
