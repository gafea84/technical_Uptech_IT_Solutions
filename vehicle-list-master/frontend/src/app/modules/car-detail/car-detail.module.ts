/**
 * car-detail.module
 * Módulo sencillo para hacer lazy loading del detalle de cada vehículo
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CarDetailComponent } from "./car-detail.component";

import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";

import {
  LazyLoadImageModule,
  intersectionObserverPreset
} from "ng-lazyload-image";

const routes: Routes = [{ path: ":id", component: CarDetailComponent }];

@NgModule({
  declarations: [CarDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset // <-- tell LazyLoadImage that you want to use IntersectionObserver
    })
  ]
})
export class CarDetailModule {}
