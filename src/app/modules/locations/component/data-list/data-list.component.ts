import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from "devextreme-angular";
import { Observable } from 'rxjs';
import { catchError} from 'rxjs/operators';

interface Country {
  code: number | string,
  description: string,
  name: string
}


@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})

export class DataListComponent {
  title = {single: 'country', plural: "countries"}
  cols = [{field: "code", type: "string"}, {field: "name", type: "string"}, {field: "description", type: "string"}]
  data:Country[] = []
  popupVisible = false;
  addDataButtonOptions: any;

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;

  constructor() {
    this.data = [
      {code: "DZD", name: "Algeria", description: "azeaze"},
      {code: "KSA", name: "Saudi Arabia",description: "azeaze"},
      {code: "TN",  name: "Tunisia", description: "azeaze"},
      {code: "MA", name: "Morocco", description: "azeaze"}
    ]

    this.addDataButtonOptions =  {
      text: "Submit",
      useSubmitBehavior: true
    }
  }

  openModal () {
    this.popupVisible = !this.popupVisible
  }

  onInitNewRow (e:any) {
    e.data.code = "DZD";
    e.data.name = "SDAZ";
    e.data.description = "azeazeazeaze"
  }

  addRow () {
    this.dataGrid.instance.addRow();
  }

  handleSubmit (event: any) {
    this.openModal()
  }
}
