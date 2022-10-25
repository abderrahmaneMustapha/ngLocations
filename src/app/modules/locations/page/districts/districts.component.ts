import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/config/config.modal';
import { ConfigService } from 'src/app/config/config.service';
import { DataService } from 'src/app/core/service/data.service';
import { Field, formField, Title } from '../../component/data-list/data-list.model';
import { DbRegion } from '../regions/regions.model';
import { RegionsService } from '../regions/regions.service';
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
  districts: DbDistrict[];
  states: DbState[];
  title: Title = {single: 'district', plural: "Districts"}
  cols: Field[] = [
    {caption: "Code", field: "code", type: "string"},
    {caption: "Name", field: "name", type: "string"},
    {caption: "Description", field: "description", type: "string"},
  ]

  formFields: formField[] = [
    {dataField: "code", isRequired: true, editorType: "dxTextBox"},
    {dataField: "name", isRequired: true, editorType: "dxTextBox"},
    {dataField: "description", isRequired: true, editorType: "dxTextBox"},
  ]

  config: Config

  constructor(
    private service: DistrictsService,
    private stateService: StatesService,
    private configService: ConfigService,
    private dataService: DataService ) {
  }

  ngOnInit(): void {
    this.configService.getConfig().subscribe( val => {
      this.config = val
      this.service.getDistricts(val).subscribe( districts => this.districts = districts)
      this.stateService.getStates(val).subscribe( states => {
        this.cols.push({caption: "State", field: "state.name", type: "DbState", lookUp: { dataSource: states, displayExpr:"name"}})

        // change the position of button and countries selector, keep button
        // the last item in the form
        let tempFormfield = this.formFields[this.formFields.length-1]
        this.formFields = this.formFields.filter((field) => field.dataField !== undefined)

        let regions = this.dataService.regionsFromStates(states)
        let countries = this.dataService.countriesFromRegion(regions)

        this.formFields.push({dataField: "country", isRequired: true, editorType: "dxSelectBox", editorOptions: {
          items: countries,
          displayExpr: 'name',
        }})

        this.formFields.push({dataField: "region", isRequired: true, editorType: "dxSelectBox", editorOptions: {
          items: regions,
          displayExpr: 'name',
        }})

        this.formFields.push({dataField: "state", isRequired: true, editorType: "dxSelectBox", editorOptions: {
          items: states,
          displayExpr: 'name',
        }})
        this.formFields.push(tempFormfield)

        this.states = states
      })

    })
  }

  addDistrict(event: any) {
    let id = this.dataService.getLastId(this.districts) + 1
    this.service.addDistrict(event, this.config, id).subscribe(val => console.log(val))
  }

  updateDistrict(event: any) {
    event.state.name = event.state.name.name
    this.service.updateDistrict(event, this.config).subscribe(val => console.log(val))
  }

  deleteDistrict(event: any) {
    console.log(this.districts)
    let id = event.id
    this.service.deleteDistrict(this.config, id).subscribe(val => console.log(val))
  }

}
