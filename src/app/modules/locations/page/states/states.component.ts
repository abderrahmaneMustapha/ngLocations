import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/config/config.modal';
import { ConfigService } from 'src/app/config/config.service';
import { DataService } from 'src/app/core/service/data.service';
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
  title: Title = {single: 'state', plural: "States"}
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

  constructor(private service: StatesService, private regionsService: RegionsService,  private configService: ConfigService,
    private dataService: DataService ) {
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

        let countries = this.dataService.countriesFromRegion(regions)
        this.formFields.push({dataField: "country", isRequired: true, editorType: "dxSelectBox", editorOptions: {
          items: countries,
          displayExpr: 'name',
        }})

        this.formFields.push({dataField: "region", isRequired: true, editorType: "dxSelectBox", editorOptions: {
          items: regions,
          displayExpr: 'name',
        }})

        this.formFields.push(tempFormfield)

        this.regions = regions
      })

    })
  }

  addState(event: any) {
    console.log(event)
    let id = this.configService.getLastId(this.regions) + 1
    this.service.addState(event, this.config, id).subscribe(val => console.log(val))
  }

  updateState(event: any) {
    event.region.name = event.region.name.name
    console.log("event", event)
    this.service.updateState(event, this.config).subscribe(val => console.log(val))
  }

  deleteState(event: any) {
    let id = event.id
    this.service.deleteState(this.config, id).subscribe(val => console.log(val))
  }

}
