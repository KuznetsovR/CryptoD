import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TotalRoutingModule } from './total-routing.module';
import { TotalComponent } from './total.component';
import {NavMenuModule} from "../../modules/nav-menu/nav-menu.module";


@NgModule({
  declarations: [
    TotalComponent
  ],
  imports: [
    CommonModule,
    TotalRoutingModule,
    NavMenuModule
  ]
})
export class TotalModule { }
