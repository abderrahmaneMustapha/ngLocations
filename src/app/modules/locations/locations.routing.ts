import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlocksComponent } from './page/blocks/blocks.component';
import { CountriesComponent } from './page/countries/countries.component';
import { CountysComponent } from './page/countys/countys.component';
import { DistrictsComponent } from './page/districts/districts.component';
import { RegionsComponent } from './page/regions/regions.component';
import { StatesComponent } from './page/states/states.component';

const routes: Routes = [
  { path: 'countries', component: CountriesComponent},
  { path: 'regions', component: RegionsComponent},
  { path: 'countys', component: CountysComponent},
  { path: 'states', component: StatesComponent},
  { path: 'districts', component: DistrictsComponent},
  { path: 'blocks', component: BlocksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
