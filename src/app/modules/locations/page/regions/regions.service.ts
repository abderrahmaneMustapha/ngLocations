import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Config } from "src/app/config/config.modal";
import { HttpParams } from "@angular/common/http";
import { DbRegion } from "./regions.model";

@Injectable()
export class RegionsService {

  constructor(private http: HttpClient) {
  }

  getRegions (config: Config) {
    return this.http.get<DbRegion[]>(config.regionsUrl)
  }

  addRegion(region: DbRegion, config: Config, id: number) {
    let createParams =  {
        id: id,
        isDefault: true,
        code: region.code,
        description: region.description,
        name: region.name,
        country: region.country

      }

    return this.http.post(config.countriesUrl, createParams)
  }

  updateRegion (region: DbRegion, config: Config) {
    let createParams =  {
        id: region.id,
        isDefault: true,
        code: region.code,
        description: region.description,
        name: region.code,
        country: region.country
      }

    return this.http.put(config.regionsUrl + `/${region.id}`, createParams)
  }

  deleteRegion (config: Config, id: number) {
    return this.http.delete(config.regionsUrl + `/${id}`)
  }
}
