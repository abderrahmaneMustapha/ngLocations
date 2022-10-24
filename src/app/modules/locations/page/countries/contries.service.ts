import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Config } from "src/app/config/config.modal";
import { HttpParams } from "@angular/common/http";
import { DbCountry } from "./countries.model";

@Injectable()
export class CountriesService {

  constructor(private http: HttpClient) {
  }

  getCountries (config: Config) {
    return this.http.get<DbCountry[]>(config.countriesUrl)
  }

  addCountry(country: DbCountry, config: Config, id: number) {
    let createParams = new HttpParams({
      fromObject : {
        id: id,
        isDefault: true,
        code: country.code,
        description: country.description,
        name: country.name,
      }
    })

    return this.http.post(config.countriesUrl, createParams)
  }

  updateCountry (country: DbCountry, config: Config) {
    let createParams = new HttpParams({
      fromObject : {
        id: country.id,
        isDefault: true,
        code: country.code,
        description: country.description,
        name: country.name,
      }
    })

    return this.http.put(config.countriesUrl + `/${country.id}`, createParams)
  }

  deleteCountry (config: Config, id: number) {
    return this.http.delete(config.countriesUrl + `/${id}`)
  }
}
