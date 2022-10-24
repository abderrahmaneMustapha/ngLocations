import { Component, DoCheck } from '@angular/core';
import { NavService } from './core/service/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements DoCheck {
  isDrawerOpen = true;
  title = 'ngCountriesManager';

  constructor( private navService: NavService) {}

  ngDoCheck(): void {
    if ( this.navService.isDrawerOpen != this.isDrawerOpen) {
      this.isDrawerOpen = this.navService.isDrawerOpen
    }
  }
}
