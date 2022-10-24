import { Injectable } from "@angular/core";


@Injectable()
export class NavService {
  isDrawerOpen = true

  handleDrawer(drawerState: boolean) {
    this.isDrawerOpen = drawerState
  }
}