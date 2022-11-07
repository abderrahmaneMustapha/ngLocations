import ArrayStore from "devextreme/data/array_store"
import { DbCountry } from "src/app/modules/locations/page/countries/countries.model"
import { NavService } from "./nav.service"

describe('Nav Service', () => {
  let service: NavService
  let formFields: any[]
  let countries: DbCountry[]
  let dataSource: ArrayStore

  beforeEach(() => {
    service = new NavService()
    countries = [
      {
        "code": "KSA",
        "description": "azeaze",
        "isDefault": true,
        "name": "Saudi Arabia",
        "id": 1
      },
      {
        "code": "DZD",
        "description": "azeaze",
        "isDefault": true,
        "name": "Algeria",
        "id": 0
      },
      {
        "code": "TN",
        "description": "azeaze",
        "isDefault": true,
        "name": "Tunisia",
        "id": 2
      },
    ]
    dataSource =  new ArrayStore({
      data: countries,
      key: 'name'
    }),
    formFields = [
      {dataField: "country", isRequired: true, editorType: "dxSelectBox", editorOptions: {
        dataSource: dataSource,
        displayExpr: 'name',
        valueExpr: 'name',
      }}
    ]
  })

  it('update a form field data source with new data', () => {
    expect(service.updateSelectors('country', [countries[0], countries[1]], formFields)).toBeTruthy()
    expect(service.updateSelectors('country', [countries[0], countries[1]], formFields)).not.toBe(formFields)
    expect(service.updateSelectors('country', [countries[0], countries[1]], formFields)[0].editorOptions.dataSource.byKey('name'))
      .not.toEqual(dataSource.byKey('name'))
  })

  it('open and close drawer', () => {
    service.handleDrawer(true)
    expect(service.isDrawerOpen).toBe(true)

    service.handleDrawer(false)
    expect(service.isDrawerOpen).toBe(false)
  })
})