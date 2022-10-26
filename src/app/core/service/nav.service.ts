import { Injectable } from "@angular/core";
import { DataListComponent } from "src/app/modules/locations/component/data-list/data-list.component";
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

  updateSelectors(key: string, data: DbRegion[] | DbState[] | DbDistrict[], dataList: DataListComponent, formFields: formField[]) {
    let selectors = formFields.filter((field) => field.editorType === "dxSelectBox" && field?.dataField === key)
    let diff = (data as any)?.every((d:any, index: number) => {
      return selectors[0]?.editorOptions.dataSource._array[index].id === d.id
    })

    if (
      selectors.length && data &&
      (data.length !== selectors[0]?.editorOptions.dataSource._array.length || !diff)
    ) {
      dataList.form.itemsChildren.forEach((item)=> {
        if (item.dataField === key) {
          item.editorOptions.dataSource._array = data
          dataList.ngOnInit()
        }
      })
    }
  }
}