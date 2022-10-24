import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Config } from "src/app/config/config.modal";
import { DbState } from "./states.model";

@Injectable()
export class StatesService {

  constructor(private http: HttpClient) {
  }

  getStates(config: Config) {
    return this.http.get<DbState[]>(config.statesUrl)
  }

  addState(state: DbState, config: Config, id: number) {
    let createParams =  {
        id: id,
        isDefault: true,
        code: state.code,
        description: state.description,
        name: state.name,
        region: state.region
      }

    return this.http.post(config.statesUrl, createParams)
  }

  updateState(state: DbState, config: Config) {
    let createParams =  {
        id: state.id,
        isDefault: true,
        code: state.code,
        description: state.description,
        name: state.code,
        region: state.region
      }

    return this.http.put(config.statesUrl + `/${state.id}`, createParams)
  }

  deleteState(config: Config, id: number) {
    return this.http.delete(config.statesUrl + `/${id}`)
  }
}
