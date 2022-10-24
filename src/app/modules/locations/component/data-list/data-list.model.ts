export interface Title {
  single: string,
  plural: string
}

export interface Field {
  caption: string,
  field: string,
  type: string
  lookUp?: LookUp
}

interface LookUp {
  dataSource: any,
  displayExpr: string,
}

export interface formField {
  dataField: string,
  editorType: string,
  isRequired: boolean,
  editorOptions?: any
}
