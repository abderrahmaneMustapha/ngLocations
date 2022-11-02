import { Component, OnInit } from '@angular/core';
import ArrayStore from 'devextreme/data/array_store';
import { Config } from 'src/app/config/config.modal';
import { ConfigService } from 'src/app/config/config.service';
import { DataService } from 'src/app/core/service/data.service';
import { NavService } from 'src/app/core/service/nav.service';
import { Field, Title } from '../../component/data-list/data-list.model';
import { DbRegion } from '../regions/regions.model';
import { DbState } from '../states/states.model';
import { StatesService } from '../states/states.service';
import { DbDistrict } from './districts.model';
import { DistrictsService } from './districts.service';


@Component({
  selector: 'app-districts',
  templateUrl: './districts.component.html',
  styleUrls: ['./districts.component.scss'],
  providers: [DistrictsService, StatesService]
})
export class DistrictsComponent implements OnInit {
  states: DbState[];
  districts: DbDistrict[];
  title: Title = {single: 'district', plural: "Districts"}
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

  regions: DbRegion[];
  filteredRegions: DbRegion[];
  filteredStates: DbState[];
  config: Config
  popupVisible = false
  addDataButtonOptions = {
    text: 'Submit',
    type: 'success',
    useSubmitBehavior: true,
  }

  constructor(
    private service: DistrictsService,
    private stateService: StatesService,
    private configService: ConfigService,
    private dataService: DataService,
    private navService: NavService ) {
  }

  ngOnInit(): void {
    this.configService.getConfig().subscribe( val => {
      this.config = val
      this.service.getDistricts(val).subscribe( districts => this.districts = districts)
      this.stateService.getStates(val).subscribe( states => {
        this.cols.push({caption: "State", field: "state.name", type: "DbState", lookUp: { dataSource: states, displayExpr:"name"}})

        // change the position of button and countries selector, keep button
        // the last item in the form
        this.formFields = this.formFields.filter((field) => field.dataField !== undefined)

        this.states = states
        this.regions = this.dataService.regionsFromStates(this.states)
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
          onValueChanged: (event:any) => {
            let filteredStates = this.dataService.statesFromRegion(event.value, this.states)
            this.formFields = this.navService.updateSelectors('state', filteredStates, this.formFields)
          }
        }})

        this.formFields.push({dataField: "state", isRequired: true, editorType: "dxSelectBox", editorOptions: {
          dataSource: new ArrayStore({
            data: states,
            key: 'name'
          }),
          displayExpr: 'name',
          valueExpr: 'name',
        }})

        this.formFields.push({ editorType: "dxButton", itemType: "button", buttonOptions: this.addDataButtonOptions})
      })

    })
  }

  openModal () {
    this.popupVisible = !this.popupVisible
  }

  handleSubmit(event: any) {
    let id = this.dataService.getLastId(this.districts) + 1
    this.service.addDistrict(event.data, this.config, id).subscribe(val => console.log(val))
  }

  updateData(event: any) {
    event.data.district.name = event.data.district.name.name
    this.service.updateDistrict(event.data, this.config).subscribe(val => console.log(val))
  }

  removeData(event: any) {
    let id = event.data.id
    this.service.deleteDistrict(this.config, id).subscribe(val => console.log(val))
  }

}
