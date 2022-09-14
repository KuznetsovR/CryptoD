import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NftsRoutingModule } from './nfts-routing.module';
import { NftsComponent } from './nfts.component';
import {NavMenuModule} from "../../modules/nav-menu/nav-menu.module";


@NgModule({
  declarations: [
    NftsComponent
  ],
  imports: [
    CommonModule,
    NftsRoutingModule,
    NavMenuModule
  ]
})
export class NftsModule { }
