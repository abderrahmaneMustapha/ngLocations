import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Config } from "src/app/config/config.modal";
import { ConfigService } from "src/app/config/config.service";
import { HttpParams } from "@angular/common/http";

@Injectable()
export class CountriesService {
  config: Config;
  createParams: HttpParams;

  constructor(private service: ConfigService, private http: HttpClient ) {
    this.service.getConfig().subscribe(val => this.config = val)
  }

  getCountries () {
    this.http.get(this.config.countriesUrl)
  }

  addCountrie () {
    this.createParams = new HttpParams({
      fromObject : {
        code: "",
        description: "",
        name: ""
      }
    })

    return this.http.post(this.config.countriesUrl, this.createParams)
  }

}