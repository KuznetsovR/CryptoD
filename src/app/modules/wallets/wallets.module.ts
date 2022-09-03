import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletsRoutingModule } from './wallets-routing.module';
import { WalletsComponent } from './wallets.component';


@NgModule({
  declarations: [
    WalletsComponent
  ],
  imports: [
    CommonModule,
    WalletsRoutingModule
  ]
})
export class WalletsModule { }
