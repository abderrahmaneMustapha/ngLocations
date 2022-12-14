import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationRoutingModule } from './locations.routing';
import { CountriesComponent } from './page/countries/countries.component';
import { DxButtonModule, DxDataGridModule, DxFormModule, DxPopupModule, DxBoxModule, DxSelectBoxModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { RegionsComponent } from './page/regions/regions.component';
import { CountysComponent } from './page/countys/countys.component';
import { StatesComponent } from './page/states/states.component';
import { DistrictsComponent } from './page/districts/districts.component';
import { BlocksComponent } from './page/blocks/blocks.component';
import { DataService } from 'src/app/core/service/data.service';

@NgModule({
  declarations: [
    CountriesComponent,
    RegionsComponent,
    CountysComponent,
    StatesComponent,
    DistrictsComponent,
    BlocksComponent,
  ],
  imports: [
    CommonModule,
    LocationRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxFormModule,
    DxBoxModule,
    FormsModule,
    DxSelectBoxModule
  ],
  providers: [DataService],
})
export class LocationsModule { }
