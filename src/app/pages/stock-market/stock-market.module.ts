import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockMarketRoutingModule } from './stock-market-routing.module';
import { StockMarketComponent } from './stock-market.component';


@NgModule({
  declarations: [
    StockMarketComponent
  ],
  imports: [
    CommonModule,
    StockMarketRoutingModule
  ]
})
export class StockMarketModule { }
