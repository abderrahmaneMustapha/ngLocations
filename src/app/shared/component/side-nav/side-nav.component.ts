import { Component, Input } from '@angular/core';
import { List } from "./side-nav.model";
import { SideNavService } from './side-nav.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  providers: [SideNavService]
})
export class SideNavComponent {
  @Input() isDrawerOpen:boolean = true;

  navigation: List[];
  selectedOpenMode = 'shrink';
  selectedPosition = 'left';
  selectedRevealMode = 'slide';

  constructor( private service: SideNavService) {
    this.navigation = this.service.getNavigationList()
  }

}
