import { Injectable } from "@angular/core";
import { List } from "./side-nav.model";

const navigation: List[] = [
  { id: 1, text: 'Home', icon: 'home', url: "" },
  { id: 2, text: 'Countries', icon: 'map', url: "countries" },
  { id: 3, text: 'Regions', icon: 'map', url: "regions" },
  { id: 5, text: 'Countys', icon: 'map', url: "countys" },
  { id: 6, text: 'States', icon: 'map', url: "states" },
  { id: 7, text: 'Districts', icon: 'map', url: "districts" },
  { id: 8, text: 'Blocks', icon: 'map', url: "blocks" },
];

@Injectable()
export class SideNavService {
  getNavigationList(): List[] {
    return navigation;
  }
}
