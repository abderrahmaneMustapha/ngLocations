import { DbCountry } from "../countries/countries.model"

export interface County {
  code: number | string,
  description: string,
  name: string
}

export interface DbCounty {
  id: number,
  isDefault: boolean,
  code: number | string,
  description: string,
  name: string
  country: DbCountry
}
