import { Component } from '@angular/core';
import { NavService } from 'src/app/core/service/nav.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent {

  constructor(private navService: NavService) { }

  toolbarContent = [{
    widget: 'dxButton',
    location: 'before',
    options: {
      icon: 'menu',
      onClick: () => this.navService.handleDrawer(!this.navService.isDrawerOpen),
    },
  }];

}
