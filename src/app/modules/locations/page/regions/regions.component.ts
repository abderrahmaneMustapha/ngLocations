import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/config/config.modal';
import { ConfigService } from 'src/app/config/config.service';
import { Field, formField, Title } from '../../component/data-list/data-list.model';
import { RegionsService } from './regions.service';
import { DbRegion } from './regions.model';
import { DbCountry } from '../countries/countries.model';
import { CountriesService } from '../countries/contries.service';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss'],
  providers: [RegionsService, CountriesService]
})
export class RegionsComponent implements OnInit {
  regions: DbRegion[];
  countries: DbCountry[];
  title: Title = {single: 'region', plural: "Regions"}
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

  constructor(private service: RegionsService, private countriesService: CountriesService, private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.configService.getConfig().subscribe( val => {
      this.config = val
      this.service.getRegions(val).subscribe( regions => this.regions = regions)
      this.countriesService.getCountries(val).subscribe( countries => {
        this.cols.push({caption: "Country", field: "country.name", type: "DbCountry", lookUp: { dataSource: countries, displayExpr:"name"}})

        // change the position of button and countries selector, keep button
        // the last item in the form
        let tempFormfield = this.formFields[this.formFields.length-1]
        this.formFields = this.formFields.filter((field) => field.dataField !== undefined)
        this.formFields.push({dataField: "country", isRequired: true, editorType: "dxSelectBox", editorOptions: {
          items: countries,
          displayExpr: 'name',
        }})
        this.formFields.push(tempFormfield)

        this.countries = countries
      })

    })
  }

  addRegion(event: any) {
    console.log(event)
    let id = this.configService.getLastId(this.regions) + 1
    this.service.addRegion(event, this.config, id).subscribe(val => console.log(val))
  }

  updateRegion(event: any) {
    event.country.name = event.country.name.name
    console.log("event", event)
    this.service.updateRegion(event, this.config).subscribe(val => console.log(val))
  }

  deleteRegion(event: any) {
    let id = event.id
    this.service.deleteRegion(this.config, id).subscribe(val => console.log(val))
  }

}
