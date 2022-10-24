import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Config } from "src/app/config/config.modal";
import { HttpParams } from "@angular/common/http";
import { DbCounty } from "./countys.model";

@Injectable()
export class CountysService {

  constructor(private http: HttpClient) {
  }

  getCountys (config: Config) {
    return this.http.get<DbCounty[]>(config.countysUrl)
  }

  addCounty(county: DbCounty, config: Config, id: number) {
    let createParams =  {
        id: id,
        isDefault: true,
        code: county.code,
        description: county.description,
        name: county.name,
        country: county.country

      }

    return this.http.post(config.countysUrl, createParams)
  }

  updateCounty (county:DbCounty, config: Config) {
    let createParams =  {
        id: county.id,
        isDefault: true,
        code: county.code,
        description: county.description,
        name: county.code,
        country: county.country
      }

    return this.http.put(config.countysUrl + `/${county.id}`, createParams)
  }

  deleteCounty (config: Config, id: number) {
    return this.http.delete(config.countysUrl + `/${id}`)
  }
}
