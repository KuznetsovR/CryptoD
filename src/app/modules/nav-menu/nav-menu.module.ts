import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './nav-menu.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    NavMenuComponent
  ],
  exports: [
    NavMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class NavMenuModule { }
