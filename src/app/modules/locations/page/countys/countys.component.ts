import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/config/config.modal';
import { ConfigService } from 'src/app/config/config.service';
import { Field, Title } from '../../component/data-list/data-list.model';
import { CountysService } from './countys.service';
import { CountriesService } from '../countries/contries.service';
import { DbCounty } from './countys.model';
import { DbCountry } from '../countries/countries.model';
import { DataService } from 'src/app/core/service/data.service';
import ArrayStore from 'devextreme/data/array_store';

@Component({
  selector: 'app-countys',
  templateUrl: './countys.component.html',
  styleUrls: ['./countys.component.scss'],
  providers: [CountysService, CountriesService]
})
export class CountysComponent implements OnInit {
  countys: DbCounty[];
  countries: DbCountry[];
  title: Title = {single: 'county', plural: "countys"}
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

  addDataButtonOptions = {
    text: 'Submit',
    type: 'success',
    useSubmitBehavior: true,
  }

  config: Config
  popupVisible = false
  constructor(
    private service: CountysService,
    private countriesService: CountriesService,
    private configService: ConfigService,
    private dataService: DataService
  ) {
  }

  ngOnInit(): void {
    this.configService.getConfig().subscribe( val => {
      this.config = val
      this.service.getCountys(val).subscribe(countys => this.countys = countys)

      this.countriesService.getCountries(val).subscribe(countries => {
        this.cols.push({caption: "Country", field: "country.name", type: "DbCountry", lookUp: { dataSource: countries, displayExpr:"name"}})

        this.formFields.push({dataField: "country", isRequired: true, editorType: "dxSelectBox", editorOptions: {
          dataSource: new ArrayStore({
            data: countries,
            key: 'name'
          }),
          displayExpr: 'name',
          valueExpr: 'name',
        }})

        this.formFields.push({ editorType: "dxButton", itemType: "button", buttonOptions: this.addDataButtonOptions})

        this.countries = countries
      })

    })
  }

  openModal () {
    this.popupVisible = !this.popupVisible
  }

  handleSubmit(event: any) {
    let id = this.dataService.getLastId(this.countys) + 1
    this.service.addCounty(event.data, this.config, id).subscribe(val => console.log(val))
  }

  updateData(event: any) {
    event.data.district.name = event.data.district.name.name
    this.service.updateCounty(event.data, this.config).subscribe(val => console.log(val))
  }

  removeData(event: any) {
    let id = event.data.id
    this.service.deleteCounty(this.config, id).subscribe(val => console.log(val))
  }

}
