/**
 * car-list.module
 * Módulo sencillo para hacer lazy loading de la lista
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { Error404Component } from "./error404/error404.component";

const routes: Routes = [
  { path: "", component: Error404Component },
  { path: "404", redirectTo: "" }
];

@NgModule({
  declarations: [Error404Component],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export class ErrorPagesModule {}
