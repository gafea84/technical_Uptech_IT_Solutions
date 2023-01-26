/**
 * car-list.module
 * Módulo sencillo para hacer lazy loading de la lista
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CarListComponent } from "./car-list.component";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [{ path: "", component: CarListComponent }];

@NgModule({
  declarations: [CarListComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export class CarListModule {}
