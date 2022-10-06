import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RealEstateRoutingModule } from './real-estate-routing.module';
import { RealEstateComponent } from './real-estate.component';


@NgModule({
  declarations: [
    RealEstateComponent
  ],
  imports: [
    CommonModule,
    RealEstateRoutingModule
  ]
})
export class RealEstateModule { }
