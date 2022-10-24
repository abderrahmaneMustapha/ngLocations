import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Config } from "src/app/config/config.modal";
import { DbDistrict } from "./districts.model";

@Injectable()
export class DistrictsService {

  constructor(private http: HttpClient) {
  }

  getDistricts(config: Config) {
    return this.http.get<DbDistrict[]>(config.districtsUrl)
  }

  addDistrict(district: DbDistrict, config: Config, id: number) {
    let createParams =  {
        id: id,
        isDefault: true,
        code: district.code,
        description: district.description,
        name: district.name,
        state: district.state
      }

    return this.http.post(config.districtsUrl, createParams)
  }

  updateDistrict(district: DbDistrict, config: Config) {
    let createParams =  {
        id: district.id,
        isDefault: true,
        code: district.code,
        description: district.description,
        name: district.code,
        state: district.state
      }

    return this.http.put(config.districtsUrl + `/${district.id}`, createParams)
  }

  deleteDistrict(config: Config, id: number) {
    return this.http.delete(config.districtsUrl + `/${id}`)
  }
}
