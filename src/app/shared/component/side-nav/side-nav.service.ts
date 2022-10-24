import { Injectable } from "@angular/core";
import { List } from "./side-nav.model";

const navigation: List[] = [
  { id: 1, text: 'Home', icon: 'home', url: "" },
  { id: 2, text: 'Countries', icon: 'map', url: "countries" },
  { id: 3, text: 'Regions', icon: 'map', url: "regions" },
  { id: 5, text: 'Countys', icon: 'map', url: "countys" },
];

@Injectable()
export class SideNavService {
  getNavigationList(): List[] {
    return navigation;
  }
}
