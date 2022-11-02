import { Component, OnInit} from '@angular/core';
import ArrayStore from 'devextreme/data/array_store';
import { Config } from 'src/app/config/config.modal';
import { ConfigService } from 'src/app/config/config.service';
import { DataService } from 'src/app/core/service/data.service';
import { NavService } from 'src/app/core/service/nav.service';
import { Field, Title } from '../../component/data-list/data-list.model';
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
export class BlocksComponent implements OnInit {

  title: Title = {single: 'block', plural: "blocks"}
  cols: Field[] = [
    {caption: "Code", field: "code", type: "string"},
    {caption: "Name", field: "name", type: "string"},
    {caption: "Description", field: "description", type: "string"},
  ]
  prodcuts = [{name:"az", id :0}, {name:"aze", id:2}]
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
  addDataButtonOptions = {
    text: 'Submit',
    type: 'success',
    useSubmitBehavior: true,
  }

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

        this.districts = districts

        this.states = this.dataService.statesFromDistricts(districts)

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
            let filteredStates = this.dataService.statesFromRegion(event.value,this.states)
            this.formFields = this.navService.updateSelectors('state', filteredStates, this.formFields)
          }
        }})

        this.formFields.push({dataField: "state", isRequired: true, editorType: "dxSelectBox", editorOptions: {
          dataSource: new ArrayStore({
            data: this.states,
            key: 'name'
          }),
          displayExpr: 'name',
          valueExpr: 'name',
          onValueChanged: (event:any) => {
            let filteredDistricts = this.dataService.districtsFromState(event.value,this.districts)
            this.formFields = this.navService.updateSelectors('district', filteredDistricts, this.formFields)
          }
        }})

        this.formFields.push({dataField: "district", isRequired: true, editorType: "dxSelectBox", editorOptions: {
          dataSource: new ArrayStore({
            data: districts,
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
    let id = this.dataService.getLastId(this.blocks) + 1
    this.service.addBlock(event.data, this.config, id).subscribe(val => console.log(val))
  }

  updateData(event: any) {
    event.data.district.name = event.data.district.name.name
    this.service.updateBlock(event.data, this.config).subscribe(val => console.log(val))
  }

  removeData(event: any) {
    let id = event.data.id
    this.service.deleteBlock(this.config, id).subscribe(val => console.log(val))
  }
}
