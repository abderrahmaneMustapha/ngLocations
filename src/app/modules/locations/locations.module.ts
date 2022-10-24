import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationRoutingModule } from './locations.routing';
import { CountriesComponent } from './page/countries/countries.component';
import { DataListComponent } from './component/data-list/data-list.component';
import { DxBoxModule, DxButtonModule, DxDataGridModule, DxFormModule, DxPopupModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CountriesComponent,
    DataListComponent,
  ],
  imports: [
    CommonModule,
    LocationRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    DxBoxModule,
    DxPopupModule,
    DxFormModule,
    FormsModule,
  ]
})
export class LocationsModule { }
