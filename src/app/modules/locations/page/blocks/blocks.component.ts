import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/config/config.modal';
import { ConfigService } from 'src/app/config/config.service';
import { Field, formField, Title } from '../../component/data-list/data-list.model';
import { DbDistrict } from '../districts/districts.model';
import { DistrictsService } from '../districts/districts.service';
import { DbBlock } from './blocks.model';
import { BlocksService } from './blocks.service';


@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss'],
  providers: [BlocksService, DistrictsService]
})
export class BlocksComponent implements OnInit {
  blocks: DbBlock[];
  districts: DbDistrict[];
  title: Title = {single: 'block', plural: "blocks"}
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

  constructor(private service: BlocksService, private districtService: DistrictsService, private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.configService.getConfig().subscribe( val => {
      this.config = val
      this.service.getBlocks(val).subscribe( blocks => { console.log((this.blocks)); this.blocks = blocks})

      this.districtService.getDistricts(val).subscribe( districts => {
        this.cols.push({caption: "District", field: "district.name", type: "DbState", lookUp: { dataSource: districts , displayExpr:"name"}})

        // change the position of button and countries selector, keep button
        // the last item in the form
        let tempFormfield = this.formFields[this.formFields.length-1]
        this.formFields = this.formFields.filter((field) => field.dataField !== undefined)
        this.formFields.push({dataField: "district", isRequired: true, editorType: "dxSelectBox", editorOptions: {
          items: districts,
          displayExpr: 'name',
        }})
        this.formFields.push(tempFormfield)

        this.districts = districts
      })
      console.log((this.blocks))
    })
  }

  addBlock(event: any) {
    let id = this.configService.getLastId(this.blocks) + 1
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
