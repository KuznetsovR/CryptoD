import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import {NavMenuModule} from "../../modules/nav-menu/nav-menu.module";


@NgModule({
  declarations: [
    ChartsComponent
  ],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    NavMenuModule
  ]
})
export class ChartsModule { }
