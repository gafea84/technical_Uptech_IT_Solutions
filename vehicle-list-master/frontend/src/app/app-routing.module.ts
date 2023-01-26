import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: "./modules/home/home.module#HomeModule"
  },
  {
    path: "list",
    loadChildren: "./modules/car-list/car-list.module#CarListModule"
  },
  {
    path: "detail",
    loadChildren: "./modules/car-detail/car-detail.module#CarDetailModule"
  },
  {
    path: "404",
    loadChildren: "./modules/error-pages/error-pages.module#ErrorPagesModule"
  },
  {
    path: "**",
    redirectTo: "/404"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
