import { Component, Input, ViewChild, OnInit, Output, EventEmitter} from '@angular/core';
import { DxDataGridComponent, DxFormComponent } from "devextreme-angular";
import { DbCountry } from '../../page/countries/countries.model';
import { Field, Title } from './data-list.model';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})

export class DataListComponent implements OnInit {
  @Input() title: Title
  @Input() cols: Field[]
  @Input() data: DbCountry[] = []
  @Input() fields = []
  @Input() formFields: any[] = []

  @Output() add: EventEmitter<any> = new EventEmitter()
  @Output() update: EventEmitter<any> = new EventEmitter()
  @Output() delete: EventEmitter<any> = new EventEmitter()

  @ViewChild(DxFormComponent, { static: false }) form:DxFormComponent;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;

  popupVisible = false
  addDataButtonOptions = {
    text: 'Submit',
    type: 'success',
    useSubmitBehavior: true,
  }

  constructor() {console.log(this.fields)}

  ngOnInit(): void {
    let buttonField = this.formFields.filter((field) => field.editorType === "dxButton")
    if(!buttonField.length) {
      this.formFields.push({ editorType: "dxButton", itemType: "button", buttonOptions: this.addDataButtonOptions})
    }
    this.formFields =([] as any).concat(this.formFields)
  }

  openModal () {
    this.popupVisible = !this.popupVisible
  }

  handleSubmit (event: any) {
    event.preventDefault()
    let data: any = {}
    this.formFields.forEach((field) => {
      if(field.dataField) {
        data[field.dataField] = this.form.instance.option('formData')[field.dataField]
      }
    })
    this.add.emit(data)
    this.openModal()
  }

  updateData (event:any) {
    this.update.emit(event.data)
  }

  removeData (event:any) {
    this.delete.emit(event.data)
  }
}
