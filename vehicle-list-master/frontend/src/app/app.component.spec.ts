/**
 * app.component.spec
 * Pruebas unitarias para el app component
 */

// Importación de los módulos y componentes necesarios para realizar las pruebas
import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { filterEffects } from "./ngrx/effects/filter.effects";
import { appReducers } from "./app.reducers";
import { HttpClientModule } from "@angular/common/http";

// Pruebas
describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        StoreModule.forRoot(appReducers),
        EffectsModule.forRoot([filterEffects])
      ],
      declarations: [AppComponent],
      providers: [RouterModule]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
