import { Component, OnInit} from '@angular/core';
import ArrayStore from 'devextreme/data/array_store';
import { Config } from 'src/app/config/config.modal';
import { ConfigService } from 'src/app/config/config.service';
import { DataService } from 'src/app/core/service/data.service';
import { NavService } from 'src/app/core/service/nav.service';
import { Field, formField, Title } from '../../component/data-list/data-list.model';
import { DbRegion } from '../regions/regions.model';
import { RegionsService } from '../regions/regions.service';
import { DbState } from './states.model';
import { StatesService } from './states.service';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss'],
  providers: [RegionsService, StatesService]
})
export class StatesComponent implements OnInit {
  regions: DbRegion[];
  states: DbState[];
  filteredRegions: DbRegion[];

  title: Title = {single: 'state', plural: "States"}
  cols: Field[] = [
    {caption: "Code", field: "code", type: "string"},
    {caption: "Name", field: "name", type: "string"},
    {caption: "Description", field: "description", type: "string"},
  ]

  formFields: any[] = [
    {dataField: "code", isRequired: true, editorType: "dxTextBox", validationRules: [
      {type: "pattern", pattern: '[A-Z0-9]', message: "Only numbers and upper case letters is allowed"}
    ]},
    {dataField: "name", isRequired: true, editorType: "dxTextBox", validationRules: [
      {type: "pattern", pattern: '[A-Z0-9a-z]', message: "only letters and numbers  are allowed"}
    ]},
    {dataField: "description", isRequired: true, editorType: "dxTextBox", validationRules: [
      {type: "pattern", pattern: '[A-Z0-9a-z;:,.]', message: "only letters, number, and the following characters ',;:.' are allowed"}
    ]},
  ]
  popupVisible = false
  config: Config
  addDataButtonOptions = {
    text: 'Submit',
    type: 'success',
    useSubmitBehavior: true,
  }

  constructor(
    private service: StatesService,
    private regionsService: RegionsService,
    private configService: ConfigService,
    private dataService: DataService,
    private navService: NavService
   ) {
  }

  ngOnInit(): void {
    this.configService.getConfig().subscribe( val => {
      this.config = val
      this.service.getStates(val).subscribe( states => this.states = states)
      this.regionsService.getRegions(val).subscribe( regions => {
        this.cols.push({caption: "Region", field: "region.name", type: "DbRegion", lookUp: { dataSource: regions, displayExpr:"name"}})

        this.regions = regions
        let countries = this.dataService.countriesFromRegion(this.regions)

        this.formFields.push({dataField: "country", isRequired: true, editorType: "dxSelectBox", editorOptions: {
          dataSource: new ArrayStore({
            data: countries,
            key: 'name'
          }),
          displayExpr: 'name',
          valueExpr: 'name',
          onValueChanged: (event:any) => {
            let filteredRegions = this.dataService.regionsFromCountry(event.value, this.regions)
            this.formFields = this.navService.updateSelectors('region', filteredRegions, this.formFields)
          }
        }})

        this.formFields.push({dataField: "region", isRequired: true, editorType: "dxSelectBox", editorOptions: {
          dataSource: new ArrayStore({
            data: this.regions,
            key: 'name'
          }),
          displayExpr: 'name',
          valueExpr: 'name',
        }})

        this.formFields.push({ editorType: "dxButton", itemType: "button", buttonOptions: this.addDataButtonOptions})
      })

    })
  }

  addState(event: any) {
    let id = this.dataService.getLastId(this.regions) + 1
    this.service.addState(event.data, this.config, id).subscribe(val => console.log(val))
  }

  updateState(event: any) {
    event.data.region.name = event.data.region.name.name
    this.service.updateState(event, this.config).subscribe(val => console.log(val))
  }

  deleteState(event: any) {
    let id = event.data.id
    this.service.deleteState(this.config, id).subscribe(val => console.log(val))
  }

  openModal () {
    this.popupVisible = !this.popupVisible
  }

  handleSubmit(event: any) {
    let id = this.dataService.getLastId(this.states) + 1
    this.service.addState(event.data, this.config, id).subscribe(val => console.log(val))
  }

  updateData(event: any) {
    event.data.district.name = event.data.district.name.name
    this.service.updateState(event.data, this.config).subscribe(val => console.log(val))
  }

  removeData(event: any) {
    let id = event.data.id
    this.service.deleteState(this.config, id).subscribe(val => console.log(val))
  }


}
