import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/config/config.modal';
import { ConfigService } from 'src/app/config/config.service';
import { DataService } from 'src/app/core/service/data.service';
import { Field, Title } from '../../component/data-list/data-list.model';
import { CountriesService } from './contries.service';
import { DbCountry } from './countries.model';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
  providers: [CountriesService]
})
export class CountriesComponent implements OnInit {
  countries: DbCountry[];
  title: Title = {single: 'country', plural: "countries"}
  cols: Field[] = [
    {caption: "Code", field: "code", type: "string"},
    {caption: "Name", field: "name", type: "string"},
    {caption: "Description", field: "description", type: "string"}
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

  constructor(private service: CountriesService, private configService: ConfigService, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.configService.getConfig().subscribe( val => {
      this.config = val
      this.service.getCountries(val).subscribe( countries => this.countries = countries)
    })
  }

  openModal () {
    this.popupVisible = !this.popupVisible
  }

  handleSubmit(event: any) {
    let id = this.dataService.getLastId(this.countries) + 1
    this.service.addCountry(event.data, this.config, id).subscribe(val => console.log(val))
  }

  updateData(event: any) {
    event.data.district.name = event.data.district.name.name
    this.service.updateCountry(event.data, this.config).subscribe(val => console.log(val))
  }

  removeData(event: any) {
    let id = event.data.id
    this.service.deleteCountry(this.config, id).subscribe(val => console.log(val))
  }

}
