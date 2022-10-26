import { ThisReceiver } from '@angular/compiler';
import { Component, DoCheck, OnChanges, OnInit, ViewChild } from '@angular/core';
import ArrayStore from 'devextreme/data/array_store';
import { Config } from 'src/app/config/config.modal';
import { ConfigService } from 'src/app/config/config.service';
import { DataService } from 'src/app/core/service/data.service';
import { NavService } from 'src/app/core/service/nav.service';
import { DataListComponent } from '../../component/data-list/data-list.component';
import { Field, formField, Title } from '../../component/data-list/data-list.model';
import { DbCountry } from '../countries/countries.model';
import { DbDistrict } from '../districts/districts.model';
import { DistrictsService } from '../districts/districts.service';
import { DbRegion } from '../regions/regions.model';
import { DbState } from '../states/states.model';
import { DbBlock } from './blocks.model';
import { BlocksService } from './blocks.service';


@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss'],
  providers: [BlocksService, DistrictsService]
})
export class BlocksComponent implements OnInit, DoCheck {

  @ViewChild(DataListComponent, { static: false }) dataList: DataListComponent;

  title: Title = {single: 'block', plural: "blocks"}
  cols: Field[] = [
    {caption: "Code", field: "code", type: "string"},
    {caption: "Name", field: "name", type: "string"},
    {caption: "Description", field: "description", type: "string"},
  ]
  prodcuts = [{name:"az", id :0}, {name:"aze", id:2}]
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
  blocks: DbBlock[];
  districts: DbDistrict[];
  filteredDistricts: DbDistrict[];
  regions: DbRegion[];
  filteredRegions: DbRegion[];
  states: DbState[];
  filteredStates: DbState[];

  constructor(
    private service: BlocksService,
    private districtService: DistrictsService,
    private configService: ConfigService,
    private dataService: DataService,
    private navService: NavService ) {
  }

  ngOnInit(): void {
    this.configService.getConfig().subscribe( val => {
      this.config = val
      this.service.getBlocks(val).subscribe( blocks => {this.blocks = blocks})

      this.districtService.getDistricts(val).subscribe( districts => {
        this.cols.push({caption: "District", field: "district.name", type: "DbState", lookUp: { dataSource: districts , displayExpr:"name"}})

        // change the position of button and countries selector, keep button
        // the last item in the form
        let tempFormfield = this.formFields[this.formFields.length-1]
        let tempFormFields = this.formFields.filter((field) => field.dataField !== undefined)

        this.districts = districts

        this.states = this.dataService.statesFromDistricts(districts)

        this.regions = this.dataService.regionsFromStates(this.states)

        let countries = this.dataService.countriesFromRegion(this.regions)

        tempFormFields.push({dataField: "country", isRequired: true, editorType: "dxSelectBox", editorOptions: {
          dataSource: new ArrayStore({
            data: countries,
            key: 'name'
          }),
          displayExpr: 'name',
          valueExpr: 'name',
          onValueChanged: (event:any) => {
            console.log(event)
            this.filteredRegions = this.dataService.regionsFromCountry(event.value, this.regions)
          }
        }})

        tempFormFields.push({dataField: "region", isRequired: true, editorType: "dxSelectBox", editorOptions: {
          dataSource: new ArrayStore({
            data: this.regions,
            key: 'name'
          }),
          displayExpr: 'name',
          valueExpr: 'name',
          onValueChanged: (event:any) => {
            this.filteredStates = this.dataService.statesFromRegion(event.value,this.states)
          }
        }})

        tempFormFields.push({dataField: "state", isRequired: true, editorType: "dxSelectBox", editorOptions: {
          dataSource: new ArrayStore({
            data: this.states,
            key: 'name'
          }),
          displayExpr: 'name',
          valueExpr: 'name',
          onValueChanged: (event:any) => {
            this.filteredDistricts = this.dataService.districtsFromState(event.value,this.districts)
          }
        }})

        tempFormFields.push({dataField: "district", isRequired: true, editorType: "dxSelectBox", editorOptions: {
          dataSource: new ArrayStore({
            data: districts,
            key: 'name'
          }),
          displayExpr: 'name',
          valueExpr: 'name',
        }})

        tempFormFields.push(tempFormfield)
        this.formFields = tempFormFields


      })
    })
  }

  ngDoCheck(): void {
    if (this.formFields) {
      this.navService.updateSelectors('region', this.filteredRegions, this.dataList, this.formFields)
      this.navService.updateSelectors('state', this.filteredStates, this.dataList, this.formFields)
      this.navService.updateSelectors('district', this.filteredDistricts, this.dataList, this.formFields)
    }
  }

  addBlock(event: any) {
    let id = this.dataService.getLastId(this.blocks) + 1
    this.service.addBlock(event, this.config, id).subscribe(val => console.log(val))
  }

  updateBlock(event: any) {
    event.district.name = event.district.name.name
    this.service.updateBlock(event, this.config).subscribe(val => console.log(val))
  }

  deleteBlock(event: any) {
    let id = event.id
    this.service.deleteBlock(this.config, id).subscribe(val => console.log(val))
  }

}
