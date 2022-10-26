import { AsyncRule, CompareRule, CustomRule, EmailRule, NumericRule, PatternRule, RangeRule, RequiredRule, StringLengthRule } from "devextreme/ui/validation_rules"

export interface Title {
  single: string
  plural: string
}

export interface Field {
  caption: string
  field: string
  type: string
  lookUp?: LookUp
}

interface LookUp {
  dataSource: any
  displayExpr: string
}

export interface formField {
  dataField: string
  editorType: string
  isRequired: boolean
  editorOptions?: any
  validationRules?: RequiredRule[] | NumericRule[] | RangeRule[] | StringLengthRule[] |
                    CustomRule[] | CompareRule[] | PatternRule[] | EmailRule[] | AsyncRule[]
}
