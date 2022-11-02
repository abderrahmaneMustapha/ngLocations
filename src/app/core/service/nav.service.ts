import { Injectable } from "@angular/core";
import ArrayStore from "devextreme/data/array_store";
import { formField } from "src/app/modules/locations/component/data-list/data-list.model";
import { DbDistrict } from "src/app/modules/locations/page/districts/districts.model";
import { DbRegion } from "src/app/modules/locations/page/regions/regions.model";
import { DbState } from "src/app/modules/locations/page/states/states.model";


@Injectable()
export class NavService {
  isDrawerOpen = true

  handleDrawer(drawerState: boolean) {
    this.isDrawerOpen = drawerState
  }

  updateSelectors(key: string, data: DbRegion[] | DbState[] | DbDistrict[], formFields: formField[]) {
    formFields.forEach((field)=> {
      if (field.dataField === key) {
        field.editorOptions = {
          dataSource: new ArrayStore<any>({
            data: data,
            key: 'name'
          }),
          displayExpr: 'name',
          valueExpr: 'name'
        }
      }
    })
    return Object.assign( [], formFields)
  }
}