import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletsRoutingModule } from './wallets-routing.module';
import { WalletsComponent } from './wallets.component';
import { FormsModule } from '@angular/forms';
import { NavMenuModule } from '../../modules/nav-menu/nav-menu.module';
import { ButtonModule } from '../../modules/ui/button/button.module';
import { MoneyPipeModule } from '../../pipes/money/money.pipe';
import { TruncateMiddlePipeModule } from '../../pipes/truncate-middle/truncate-middle.pipe';

@NgModule({
  declarations: [WalletsComponent],
  imports: [CommonModule, FormsModule, WalletsRoutingModule, NavMenuModule, ButtonModule, MoneyPipeModule, TruncateMiddlePipeModule],
})
export class WalletsModule {}
