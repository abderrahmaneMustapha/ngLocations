import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from './page/countries/countries.component';

const routes: Routes = [
  { path: 'countries', component: CountriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
