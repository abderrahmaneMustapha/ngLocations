export interface Country {
  code: number | string,
  description: string,
  name: string
}

export interface DbCountry {
  id: number,
  isDefault: boolean,
  code: number | string,
  description: string,
  name: string
}
