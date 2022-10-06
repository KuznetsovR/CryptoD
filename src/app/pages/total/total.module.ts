import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TotalRoutingModule } from './total-routing.module';
import { TotalComponent } from './total.component';
import {NavMenuModule} from "../../modules/nav-menu/nav-menu.module";
import {MoneyPipeModule} from "../../pipes/money/money.pipe";


@NgModule({
  declarations: [
    TotalComponent
  ],
  imports: [
    CommonModule,
    TotalRoutingModule,
    NavMenuModule,
    MoneyPipeModule
  ]
})
export class TotalModule { }
