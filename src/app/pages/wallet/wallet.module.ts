import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';
import {ButtonModule} from "../../modules/ui/button/button.module";

@NgModule({
  declarations: [WalletComponent],
  imports: [CommonModule, WalletRoutingModule, ButtonModule],
})
export class WalletModule {}
