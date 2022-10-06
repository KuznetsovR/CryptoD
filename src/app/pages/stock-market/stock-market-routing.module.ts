import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StockMarketComponent} from "./stock-market.component";

const routes: Routes = [ {
  path: '',
  component: StockMarketComponent,
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockMarketRoutingModule { }
