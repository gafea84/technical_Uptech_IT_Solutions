import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";

// ngrx
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { appReducers } from "./app.reducers";
import { EffectsModule } from "@ngrx/effects";
import { efects } from "./ngrx/effects";

import { environment } from "../environments/environment";

// Servicios
import { VehicleService } from "./shared/services/vehicle.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Guarda los últimos 25 estados
      logOnly: environment.production // production log-only mode
    }),
    EffectsModule.forRoot(efects)
  ],
  providers: [VehicleService],
  bootstrap: [AppComponent]
})
export class AppModule {}
