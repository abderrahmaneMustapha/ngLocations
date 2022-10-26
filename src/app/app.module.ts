import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { DxBoxModule, DxButtonModule } from 'devextreme-angular';
import { NavService } from './core/service/nav.service';
import { LocationsModule } from './modules/locations/locations.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './config/config.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    SharedModule,
    CoreModule,
    DxButtonModule,
    DashboardModule,
    LocationsModule,
    HttpClientModule
  ],
  providers: [NavService, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
