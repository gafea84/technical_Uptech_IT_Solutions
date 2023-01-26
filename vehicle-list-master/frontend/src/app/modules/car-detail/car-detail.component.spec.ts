/**
 * app.component.spec
 * Pruebas unitarias para el app component
 */

// *Importación de los módulos y componentes necesarios para realizar las pruebas
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

// componentes
import { CarDetailComponent } from "./car-detail.component";
import { VehicleItemComponent } from "src/app/shared/components/vehicle-item/vehicle-item.component";

// módulos
import {
  intersectionObserverPreset,
  LazyLoadImageModule
} from "ng-lazyload-image";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { Vehicle } from "src/classes/vehicle";
import { VehicleService } from "src/app/shared/services/vehicle.service";
import { take } from "rxjs/operators";

// *Pruebas
describe("CarDetailComponent", () => {
  let component: CarDetailComponent;
  let fixture: ComponentFixture<CarDetailComponent>;
  let nativeElement: HTMLElement;
  let vehicle: Vehicle;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CarDetailComponent, VehicleItemComponent],
      imports: [
        HttpClientModule,
        RouterModule.forRoot([]),

        LazyLoadImageModule.forRoot({
          preset: intersectionObserverPreset // <-- tell LazyLoadImage that you want to use IntersectionObserver
        })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
