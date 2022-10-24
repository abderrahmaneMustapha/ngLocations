import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from './page/countries/countries.component';
import { RegionsComponent } from './page/regions/regions.component';

const routes: Routes = [
  { path: 'countries', component: CountriesComponent},
  { path: 'regions', component: RegionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
