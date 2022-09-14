import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { HeaderModule } from './modules/header/header.module';
import { BscApiService } from './services/bsc-api/bsc-api.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, HeaderModule, RouterModule],
  providers: [BscApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
