import { DbDistrict } from "../districts/districts.model"

export interface DbBlock {
  id: number,
  isDefault: boolean,
  code: number | string,
  description: string,
  name: string
  district: DbDistrict
}
