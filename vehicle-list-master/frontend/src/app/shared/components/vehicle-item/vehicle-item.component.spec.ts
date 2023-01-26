/**
 * app.component.spec
 * Pruebas unitarias para el vehicle-item component
 */

// *Importación de los módulos y componentes necesarios para realizar las pruebas
import {
  async,
  ComponentFixture,
  TestBed,
  inject,
  fakeAsync
} from "@angular/core/testing";

// componentes
import { VehicleItemComponent } from "./vehicle-item.component";

// módulos
import {
  intersectionObserverPreset,
  LazyLoadImageModule
} from "ng-lazyload-image";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";

// *Pruebas
describe("VehicleItemComponent", () => {
  let component: VehicleItemComponent;
  let fixture: ComponentFixture<VehicleItemComponent>;
  let mockRouter = {
    navigateByUrl: jasmine.createSpy("navigateByUrl")
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleItemComponent],
      imports: [
        RouterTestingModule,
        LazyLoadImageModule.forRoot({
          preset: intersectionObserverPreset // <-- tell LazyLoadImage that you want to use IntersectionObserver
        })
      ],
      providers: [{ provide: Router, useValue: mockRouter }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('should call Router.navigate("detail/:id") with the ID of the item', () => {
    component.onClick();

    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(
      `/detail/${component.id}`
    );
  });
});
