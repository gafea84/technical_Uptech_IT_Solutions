import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VehicleItemComponent } from "./components/vehicle-item/vehicle-item.component";
import { FormsModule } from "@angular/forms";

import {
  LazyLoadImageModule,
  intersectionObserverPreset
} from "ng-lazyload-image";
import { FilterComponent } from "./components/filter/filter.component";

@NgModule({
  declarations: [VehicleItemComponent, FilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset // <-- tell LazyLoadImage that you want to use IntersectionObserver
    })
  ],
  exports: [VehicleItemComponent, FilterComponent]
})
export class SharedModule {}
