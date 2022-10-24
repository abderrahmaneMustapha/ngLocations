import { DbCountry } from "../countries/countries.model"

export interface Region {
  code: number | string,
  description: string,
  name: string
}

export interface DbRegion {
  id: number,
  isDefault: boolean,
  code: number | string,
  description: string,
  name: string
  country: DbCountry
}
