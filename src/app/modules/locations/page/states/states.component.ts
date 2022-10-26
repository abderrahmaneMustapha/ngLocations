import { Component, OnInit, ViewChild } from '@angular/core';
import { Config } from 'src/app/config/config.modal';
import { ConfigService } from 'src/app/config/config.service';
import { DataService } from 'src/app/core/service/data.service';
import { NavService } from 'src/app/core/service/nav.service';
import { DataListComponent } from '../../component/data-list/data-list.component';
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

  formFields: formField[] = [
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

  config: Config
  @ViewChild(DataListComponent, { static: false }) dataList: DataListComponent;

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

        // change the position of button and countries selector, keep button
        // the last item in the form
        let tempFormfield = this.formFields[this.formFields.length-1]
        this.formFields = this.formFields.filter((field) => field.dataField !== undefined)

        this.regions = regions
        let countries = this.dataService.countriesFromRegion(this.regions)

        this.formFields.push({dataField: "country", isRequired: true, editorType: "dxSelectBox", editorOptions: {
          items: countries,
          displayExpr: 'name',
          onValueChanged: (event:any) => {
            this.filteredRegions = this.dataService.regionsFromCountry(event.value, this.regions)
          }
        }})

        this.formFields.push({dataField: "region", isRequired: true, editorType: "dxSelectBox", editorOptions: {
          items: this.regions,
          displayExpr: 'name',
        }})

        this.formFields.push(tempFormfield)
      })

    })
  }

  addState(event: any) {
    let id = this.dataService.getLastId(this.regions) + 1
    this.service.addState(event, this.config, id).subscribe(val => console.log(val))
  }

  updateState(event: any) {
    event.region.name = event.region.name.name
    this.service.updateState(event, this.config).subscribe(val => console.log(val))
  }

  deleteState(event: any) {
    let id = event.id
    this.service.deleteState(this.config, id).subscribe(val => console.log(val))
  }

  ngDoCheck(): void {
    if (this.formFields) {
      this.navService.updateSelectors('region', this.filteredRegions, this.dataList, this.formFields)
    }
  }

}
