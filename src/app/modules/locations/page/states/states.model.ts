import { DbRegion } from "../regions/regions.model"

export interface DbState {
  id: number,
  isDefault: boolean,
  code: number | string,
  description: string,
  name: string
  region: DbRegion
}
