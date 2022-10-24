import { DbState } from "../states/states.model"

export interface DbDistrict {
  id: number,
  isDefault: boolean,
  code: number | string,
  description: string,
  name: string
  state: DbState
}
